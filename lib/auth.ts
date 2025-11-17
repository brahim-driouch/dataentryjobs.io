// lib/auth.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/connection";
import bcrypt from "bcryptjs";
import User from "@/db/models/User";
import Employer from "@/db/models/Empoyer";

export const authConfig: NextAuthConfig = {
  providers: [
    // EMPLOYER LOGIN PROVIDER
    CredentialsProvider({
      id: "employer-login",
      name: "Employer-Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
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
            credentials.password 
          );

          if (!isPasswordValid) {
            return null;
          }

          employer.last_login = new Date();
          await employer.save();

          // ✅ Use isVerified consistently
          return {
            id: employer._id.toString(),
            email: employer.email,
            name: employer.full_name,
            isVerified: employer.email_verified || false, // ✅ Changed from email_verified
            userType: "employer" as const,
            companyId: employer.company_id?.toString(),
            subscription: employer.subscription
          };
        } catch (error) {
          console.error("Employer authorization error:", error);
          return null; // ✅ Return null, don't throw
        }
      }
    }),

    // USER LOGIN PROVIDER
    CredentialsProvider({
      id: "user-login",
      name: "User-Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
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
          console.error("User authorization error:", error);
          return null; // ✅ Return null, don't throw
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isVerified = user.isVerified; // ✅ Changed
        token.userType = user.userType;
        token.companyId = user.companyId;
        token.subscription = user.subscription;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.isVerified = token.isVerified as boolean; // ✅ Changed
        session.user.userType = token.userType as "user" | "employer";
        session.user.companyId = token.companyId as string | undefined;
        session.user.subscription = token.subscription as any;
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