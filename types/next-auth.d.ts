// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      isVerified: boolean; 
      userType: "user" | "employer";
      companyId?: string;
      subscription?: {
        plan: "free" | "basic" | "premium" | "enterprise";
        status: "active" | "cancelled" | "expired" | "trial";
        jobs_remaining: number;
        jobs_total: number;
        renews_at?: Date;
        stripe_customer_id?: string;
        stripe_subscription_id?: string;
      };
    } & DefaultSession["user"]; // ✅ Exclude isVerified from DefaultSession
  }

  interface User {
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
    userType: "user" | "employer";
    companyId?: string;
    subscription?: {
      plan: "free" | "basic" | "premium" | "enterprise";
      status: "active" | "cancelled" | "expired" | "trial";
      jobs_remaining: number;
      jobs_total: number;
      renews_at?: Date;
      stripe_customer_id?: string;
      stripe_subscription_id?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
    userType: "user" | "employer";
    companyId?: string;
    subscription?: any;
  }
}