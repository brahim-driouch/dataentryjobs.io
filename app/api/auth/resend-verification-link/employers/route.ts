import employerQueries from "@/db/queries/employer";
import { sendEmailVerificationLink } from "@/lib/emails";
import { generateEmployerToken } from "@/lib/jwt";
import { IAPIResponse } from "@/types/api";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest):Promise<NextResponse<IAPIResponse<boolean>>>{

    try {

        const {email,userType} = await request.json() as {email:string,userType:'user' | 'employer'}; 
        if(!email || userType !== 'employer'){
            return NextResponse.json({ success: false, message: "Please enter your email address",data:false }, { status: 400 });
        }

        // check if it is a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ success: false, message: "Invalid email address",data:false }, { status: 400 });
        }

        // check if user exists with that email

        const employer = await employerQueries.getEmployerByEmail(email);

        if(!employer){
            return NextResponse.json({ success: false, message: "User not found",data:false }, { status: 400 });
        }

        // check if user is already verified
        if(employer.email_verified){
            return NextResponse.json({ success: false, message: "User is already verified",data:false }, { status: 400 });
        }

        //send verification link 

        const employerId = employer._id as unknown as Types.ObjectId;
        const token = await generateEmployerToken(employerId.toString());
        const verificationUrl = `http://localhost:3000/auth/verify-email/employers?token=${token}`;
        await sendEmailVerificationLink(employer.email, verificationUrl);
        return NextResponse.json({ success: true, message: "Verification link sent successfully",data:true }, { status: 200 });



      
        
    } catch (error) {
        
        return NextResponse.json({ success: false, message: "Failed to send verification link",data:false }, { status: 500 });
    }
}