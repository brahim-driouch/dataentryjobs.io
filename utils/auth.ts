// lib/auth-utils.ts
import { Session } from "next-auth";

export function isEmployer(session: Session | null): boolean {
  return session?.user?.userType === 'employer' || !!session?.user?.company?.companyId;
}

export function isUser(session: Session | null): boolean {
  return session?.user?.userType === 'user' && !session?.user?.company?.companyId;
}

export function hasCompany(session: Session | null): boolean {
  return !!session?.user?.company?.companyId;
}

export function isVerified(session: Session | null): boolean {
  return session?.user?.isVerified === true;
}