// lib/auth.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/connection";
import User from "@/db/models/User";
import Employer from "@/db/models/Employer";
import { validateLoginCredentials } from "./data-validator";
import { ISubscription } from "@/types/employer";
import Company from "@/db/models/Company";
import companyQueries from "@/db/queries/companies";
import employerQueries from "@/db/queries/employer";
import userQueries from "@/db/queries/users";

export const authConfig: NextAuthConfig = {
  providers: [
    // USER LOGIN PROVIDER
    CredentialsProvider({
      id: "user-login",
      name: "User-Credentials",
     
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          
          const {isValid} = validateLoginCredentials(
            credentials.email as string,
            credentials.password as string
          );
          
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

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.full_name,
            isVerified: user.email_verified || false,
            userType: "user" as const,
          };
        } catch (error) {
          console.error("User authorization error:", error);
          return null;
        }
      }
    }),

    // EMPLOYER LOGIN PROVIDER
    CredentialsProvider({
      id: "employer-login",
      name: "Employer-Credentials",
     
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          
          const {isValid, errors} = validateLoginCredentials(
            credentials.email as string, 
            credentials.password as string
          );
          
          if(!isValid){
            return null;
          }

          await connectDB();

          const employer = await Employer.findOne({ 
            email: credentials.email 
          }).select('+password_hash');

          if (!employer) {
            return null;
          }

          const isPasswordValid = await employer.comparePassword(
            credentials.password as string
          );

          if (!isPasswordValid) {
            return null;
          }

          employer.last_login = new Date();
          await employer.save();

          const company = await companyQueries.getCompanyById(employer.company_id as string);

          const userObject = {
            id: employer._id.toString(),
            email: employer.email,
            name: employer.full_name,
            isVerified: employer.email_verified || false,
            userType: "employer" as const,
            company: {
              companyId: employer.company_id.toString() as string,
              name: company?.name as string,
            },
            subscription: employer.subscription as ISubscription
          };
          
          
          return userObject;
        } catch (error) {
          console.error("❌ Employer authorization error:", error);
          return null;
        }
      }
    }),
  ],

callbacks: {
  async jwt({ token, user, trigger }) {
    console.log("🔄 JWT Callback - Trigger:", trigger, "User ID:", token.id);
    
    // Initial login
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.name = user.name;
      token.isVerified = user.isVerified;
      token.userType = user.userType;
      
      if (user.userType === "employer") {
        const employerUser = user as typeof user & {
          company: { companyId: string; name: string };
          subscription: ISubscription;
        };
        token.company = employerUser.company;
        token.subscription = employerUser.subscription;
      }
    }

    // ALWAYS check verification status from DB (not just on update)
    if (token.id && trigger === 'update') {
      try {
        await connectDB();
        
        if (token.userType === "employer") {
          const employer = await employerQueries.getEmployerById(token.id as string);
          if (employer) {
            console.log("🔍 Employer verification status:", employer.email_verified);
            token.isVerified = employer.email_verified || false;
          }
        } else {
          const normalUser = await userQueries.getUserById(token.id as string);
          if (normalUser) {
            console.log("🔍 User verification status:", normalUser.email_verified);
            token.isVerified = normalUser.email_verified || false;
          }
        }
      } catch (error) {
        console.error("❌ Error checking verification status:", error);
      }
    }
    
    return token;
  },
  
  async session({ session, token }) {
    console.log("🔐 Session Callback - Token isVerified:", token.isVerified);
    
    if (token && session.user) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.isVerified = token.isVerified as boolean;
      session.user.userType = token.userType as "user" | "employer";
      
      if (token.userType === "employer") {
        session.user.company = token.company as { companyId: string; name: string };
        session.user.subscription = token.subscription as ISubscription;
      }
    }
    
    return session;
  }
},
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  pages: {
    signIn: "/login",
  },
  
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === 'development',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);