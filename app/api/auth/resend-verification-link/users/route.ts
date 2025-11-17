import dbQueries from "@/db/queries/users";
import { sendEmailVerificationLink } from "@/lib/emails";
import { generateToken } from "@/lib/jwt";
import { IAPIResponse } from "@/types/api";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest):Promise<NextResponse<IAPIResponse<boolean>>>{

    try {
        const {userEmail} = await request.json() as {userEmail:string}; 

        if(!userEmail){
            return NextResponse.json({ success: false, message: "Failed to send verification link",data:false }, { status: 400 });
        }

        // check if it is a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            return NextResponse.json({ success: false, message: "Invalid email address",data:false }, { status: 400 });
        }

        // check if user exists with that email

        const user = await dbQueries.getUserByEmail(userEmail);

        if(!user){
            return NextResponse.json({ success: false, message: "User not found",data:false }, { status: 400 });
        }

        // check if user is already verified
        if(user.email_verified){
            return NextResponse.json({ success: false, message: "User is already verified",data:false }, { status: 400 });
        }

        //send verification link 

        const userId = user._id as Types.ObjectId;
        const token = await generateToken(userId.toString());
        const verificationUrl = `http://localhost:3000/auth/verify-email/users?token=${token}`;
        await sendEmailVerificationLink(user.email, verificationUrl);
        return NextResponse.json({ success: true, message: "Verification link sent successfully",data:true }, { status: 200 });



      
        
    } catch (error) {
        
        return NextResponse.json({ success: false, message: "Failed to send verification link",data:false }, { status: 500 });
    }
}