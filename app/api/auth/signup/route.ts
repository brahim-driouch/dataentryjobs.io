// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import connectDB from "@/db/connection";
import Employer from "@/db/models/Empoyer";
import Company from "@/db/models/Company";
import slugify from "@/utils/slugify";

const signupSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  company_name: z.string().min(2, "Company name required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = signupSchema.parse(body);
    
    await connectDB();

    // Check if email already exists
    const existingEmployer = await Employer.findOne({ 
      email: validatedData.email 
    });
    
    if (existingEmployer) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create or find company
    let company = await Company.findOne({
      name: validatedData.company_name
    });

    if (!company) {
      const slug = slugify(validatedData.company_name);
      company = await Company.create({
        name: validatedData.company_name,
        slug
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(validatedData.password, salt);

    // Create employer
    const employer = await Employer.create({
      email: validatedData.email,
      password_hash,
      full_name: validatedData.full_name,
      company_id: company._id,
      role: 'owner',
      subscription: {
        plan: 'free',
        status: 'trial',
        jobs_remaining: 1,
        jobs_total: 1
      }
    });

    return NextResponse.json(
      { 
        message: "Account created successfully",
        employer: {
          id: employer._id,
          email: employer.email,
          name: employer.full_name
        }
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}