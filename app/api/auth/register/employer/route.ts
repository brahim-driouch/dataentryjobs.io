import connectDB from "@/db/connection";
import employerQueries from "@/db/queries/employer";
import { validateNewEmployer } from "@/lib/data-validator";
import { sendEmailVerificationLink } from "@/lib/emails";
import { generateEmployerToken } from "@/lib/jwt";
import { IAPIResponse } from "@/types/api";
import { IEmployer, NewEmployer } from "@/types/employer";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<IAPIResponse<string>>> {
    const employer = await req.json() as NewEmployer;
    await connectDB();
    
    // Start a session for transaction
    const session = await mongoose.startSession();
    
    try {
        if (!employer) {
            return NextResponse.json(
                { success: false, message: "Please provide user details", data: "" },
                { status: 400 }
            );
        }

        const { isValid, errors } = validateNewEmployer(
            employer.fullName,
            employer.email,
            employer.password,
            employer.confirmPassword,
            employer.company
        );

        if (!isValid) {
            return NextResponse.json(
                { success: false, message: "All required fields", data: "" },
                { status: 400 }
            );
        }

        // Check if employer already exists (outside transaction)
        const emailExists = await employerQueries.checkEmployerExists(employer.email);

        if (emailExists) {
            return NextResponse.json(
                { success: false, message: "Email already registered, try to login", data: ""},
                { status: 400 }
            );
        }

        // Start transaction
        session.startTransaction();

        // Save the company to the database
        const { status, data } = await employerQueries.registerCompany(employer.company, session);
        
        if (!status && data) {
            await session.abortTransaction();
            return NextResponse.json(
                { success: false, message: "An account associated with this company name already exists", data:"" },
                { status: 500 }
            );
        }

        // Register user in database
        const queryResult = await employerQueries.registerEmployer(employer, session);

        if (!queryResult) {
            await session.abortTransaction();
            return NextResponse.json(
                { success: false, message: "Failed to register user", data: "" },
                { status: 500 }
            );
        }

        // Commit transaction
        await session.commitTransaction();

        // Generate token and send email (after successful transaction)
        const employerId = queryResult._id as unknown as Types.ObjectId;
        const token = await generateEmployerToken(employerId.toString());
        const verificationUrl = `http://localhost:3000/auth/verify-email/employers?token=${token}`;
        
        // Send email asynchronously (don't await to avoid blocking response)
        sendEmailVerificationLink(queryResult.email, verificationUrl).catch(error => {
            console.error("Failed to send verification email:", error);
        });

        // Return success response
        return NextResponse.json(
            { success: true, message: "Registered successfully", data: queryResult._id.toString() },
            { status: 201 }
        );

    } catch (error) {
        // Only abort transaction if it was started
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to register", data: ""},
            { status: 500 }
        );
    } finally {
        // Always end the session
        await session.endSession();
    }
}