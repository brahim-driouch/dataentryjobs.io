// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
   interface Session {
    user: Session["user"] & {
      id: string;
      role: User["role"];
      companyId: string;
      subscription?: User["subscription"];
    };
  }

  interface Employer {
    _id: mongoose.Types.ObjectId;
    email: string;
    name: string;
    role: "owner" | "recruiter" | "admin";
    companyId: string;
    subscription?: {
      plan: "free" | "basic" | "premium" | "enterprise";
      status: "active" | "cancelled" | "expired" | "trial";
      jobs_remaining: number;
      jobs_total: number;
      renews_at: Date;
      stripe_customer_id: string;
      stripe_subscription_id: string;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    companyId: string;
    subscription: any;
  }
}