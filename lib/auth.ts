// lib/auth.ts
import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  connectDB  from "@/db/connection";
import bcrypt from "bcryptjs";
import Employer from "@/db/models/Empoyer";
import User from "@/db/models/User";
import { SignInResponse } from "next-auth/react";
import { Sign } from "crypto";

export const authConfig: NextAuthConfig = {
  providers: [
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
          throw new Error("Please provide email and password");
        }

        await connectDB();

        // Find employer by email
        const employer = await Employer.findOne({ 
          email: credentials.email 
        }).select('+password_hash');

        if (!employer) {
          throw new Error("Invalid email or password");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          employer.password_hash
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Update last login
        employer.last_login = new Date();
        await employer.save();

        // Return user object (without password)
        return {
      id: employer._id.toString(),
      email: employer.email,
      name: employer.full_name,
      role: employer.role as "owner" | "recruiter" | "admin", // Type assertion
      companyId: employer.company_id.toString(),
      subscription: employer.subscription
    };
       } catch (error) {
        console.log(error);
        throw error;
       }
      }
    }),
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
         return null
      }

      await connectDB();

      // Find user by email
      const user = await User.findOne({ 
        email: credentials.email 
      }).select('+password_hash');

      if (!user) {
        return null
      }

      // ✅ FIX: Only pass the candidate password
      // The method automatically uses user.password_hash
      const isPasswordValid = await user.comparePassword(
        credentials.password as string
        // Remove the second argument - user.password_hash
      );

      if (!isPasswordValid) {
         return null
      }

      // Update last login
      user.last_login = new Date();
      await user.save();

      // Return user object (without password)
      console.log("Authenticated user:", user);
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.full_name,
      };
    } catch (error:any |SignInResponse   ) {
   
        console.log("here");
        throw new Error("Invalid email or password");
     
    }
  }
})
  ],
  

  
  callbacks: {
    async jwt({ token, user }) {
      // Add custom fields to JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add custom fields to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.companyId = token.companyId as string;
        session.user.subscription = token.subscription as any;
      }
      return session;
    }
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET!,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);