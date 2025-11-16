import dbQueries from "@/db/queries/users";
import { validateNewUser } from "@/lib/data-validator";
import { sendEmailVerificationLink } from "@/lib/emails";
import { generateToken } from "@/lib/jwt";
import { IAPIResponse } from "@/types/api";
import { newUser } from "@/types/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";





export async function POST(req: Request): Promise<NextResponse<IAPIResponse<string[] |[]>>> {
    const  user = await req.json() as newUser;
    
    try {
        if(!user){
            return NextResponse.json({ success: false, message: "Failed to register user",data:["Please provide user details"] }, { status: 400 });
        }
        const {isValid, errors} = validateNewUser(user.email, user.password, user.confirmPassword,user.location);
        if(!isValid){
            return NextResponse.json({ success: false, message: "Failed to register user",data:errors }, { status: 400 });
        }
       // check if user already exists
       const emailExists = await dbQueries.checkEmailExists(user.email);

       if(emailExists){
        return NextResponse.json({ success: false, message: "Email already registered",data:["Email already registered, please login"] }, { status: 400 });
       }

        // register user in database
        const queryResult = await dbQueries.registerUser(user);

        if(!queryResult){
            return NextResponse.json({ success: false, message: "Failed to register user",data:["Failed to register user"] }, { status: 500 });
        }
        // generate token and send email 
        const userId = queryResult._id as Types.ObjectId;
        const token = await generateToken(userId.toString());
        const email = queryResult.email;
        const verificationUrl = `http://localhost:3000/auth/verify-email/users?token=${token}`;
        await sendEmailVerificationLink(email, verificationUrl);
        
        // return success response
        return NextResponse.json({ success: true, message: "User registered successfully",data:[queryResult.toString()] }, { status: 201 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to register user",data:[] }, { status: 500 });
    }
}