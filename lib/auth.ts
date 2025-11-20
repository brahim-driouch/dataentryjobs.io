// lib/auth.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/connection";
import User from "@/db/models/User";
import Employer from "@/db/models/Employer";
import { validateLoginCredentials } from "./data-validator";
import { ISubscription } from "@/types/employer";
import employerQueries from "@/db/queries/employer";

export const authConfig: NextAuthConfig = {
  providers: [
    // EMPLOYER LOGIN PROVIDER
    CredentialsProvider({
      id: "user-login",
      name: "User-Credentials",
     
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const {isValid} = validateLoginCredentials(credentials.email as string,credentials.password as string);
          if(!isValid){
            return null;
          }

          await connectDB();

          const user = await User.findOne({ 
            email: credentials.email 
          }).select('+password_hash');
 
          if (!user) {
            return null;
          }
          const isPasswordValid = await user.comparePassword(
            credentials.password as string
          );

          if (!isPasswordValid) {
            return null;
          }

          user.last_login = new Date();
          await user.save();

          // ✅ Use isVerified consistently
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.full_name,
            isVerified: user.email_verified || false, // ✅ Changed from email_verified
            userType: "user" as const,
          };
        } catch (error) {
          console.error("Employer authorization error:", error);
          return null; // ✅ Return null, don't throw
        }
      }
    }),

    // USER LOGIN PROVIDER
   CredentialsProvider({
  id: "employer-login",
  name: "Employer-Credentials",
 
  async authorize(credentials) {
    try {
      console.log("🔍 Step 1: Checking credentials exist");
      if (!credentials?.email || !credentials?.password) {
        console.log("❌ Missing credentials");
        return null;
      }
      
      console.log("🔍 Step 2: Validating credentials format");
      const {isValid, errors} = validateLoginCredentials(credentials.email as string, credentials.password as string);
      if(!isValid){
        console.log("❌ Validation failed:", errors);
        return null;
      }

      console.log("🔍 Step 3: Connecting to database");
      await connectDB();

      console.log("🔍 Step 4: Finding employer with email:", credentials.email);
      const employer = await Employer.findOne({ 
        email: credentials.email 
      }).select('+password_hash');

      if (!employer) {
        console.log("❌ No employer found with this email");
        return null;
      }
      console.log("✅ Employer found:", employer.email);

      console.log("🔍 Step 5: Comparing passwords");
      const isPasswordValid = await employer.comparePassword(
        credentials.password as string
      );

      if (!isPasswordValid) {
        console.log("❌ Password is invalid");
        return null;
      }
      console.log("✅ Password is valid");

      console.log("🔍 Step 6: Updating last login");
      employer.last_login = new Date();
      await employer.save();

      console.log("🔍 Step 7: Returning user object");
      const userObject = {
        id: employer._id.toString(),
        email: employer.email,
        name: employer.full_name,
        isVerified: employer.email_verified || false,
        userType: "employer" as const,
        companyId: employer.company_id?.toString(),
        subscription: employer.subscription as ISubscription
      };
      console.log("✅ Returning user:", userObject);
      
      return userObject;
    } catch (error) {
      console.error("❌ Employer authorization error:", error);
      return null;
    }
  }
}),
  ],

  callbacks: {
    async jwt({ token, user,trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isVerified = user.isVerified; // ✅ Changed
        token.userType = user.userType;
        token.companyId = user.companyId;
        token.subscription = user.subscription;
      }
      if(trigger === 'update' && session.user){
        token.isVerified = session.user.isVerified;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.userType = token.userType as "user" | "employer";
  
      }

      if(session.user && token){

        if(session.user.userType === "user"){
          const user = await User.findById(token.id);
          if(user){
            session.user.isVerified = user.email_verified;
          }
        }

        if(session.user.userType === "employer"){
          session.user.companyId = token.companyId as string;
             session.user.subscription = token.subscription as ISubscription;

          const employer = await employerQueries.getEmployerById(token.id as string);
          if(employer){
            session.user.isVerified = employer.email_verified;
          }
        }

         
      }

      
      return session;
    }
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === 'development', // ✅ Add debug mode
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);