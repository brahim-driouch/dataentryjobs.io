import User from "@/db/models/User";
import userQueries from "@/db/queries/users";
import { validateNewUser } from "@/lib/data-validator";
import { sendEmailVerificationLink } from "@/lib/emails";
import { generateUserToken } from "@/lib/jwt";
import { IAPIResponse } from "@/types/api";
import { IUser, newUser } from "@/types/user";
import { dataTransformerToSnakeCase } from "@/utils/data-transformer";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { CreateEmailResponseSuccess } from "resend";    
import countries from "@/assets/countries.json"




export async function POST(req: Request): Promise<NextResponse<IAPIResponse<string[] |[]>>> {
    const  user = await req.json() as newUser;
    
    try {
        if(!user){
            return NextResponse.json({ success: false, message: "Failed to register user",data:["Please provide user details"] }, { status: 400 });
        }
        const {isValid, errors} = validateNewUser(user.email, user.password, user.confirmPassword,user.location.country);
        if(!isValid){
            return NextResponse.json({ success: false, message: "Failed to register user",data:errors }, { status: 400 });
        }
       // check if user already exists
       const emailExists = await userQueries.checkUserExists(user.email);

       if(emailExists){
        return NextResponse.json({ success: false, message: "Email already registered",data:["Email already registered, please login"] }, { status: 400 });
       }
         // transform user data to snake_case
         user.location.countryCode = countries.find((country: { name: string; code: string; }) => country.name === user.location.country)?.code;
         const transformedUser = dataTransformerToSnakeCase(user);
        // register user in database
        transformedUser.password_hash  = transformedUser.password;
        const queryResult = await userQueries.registerUser(transformedUser as IUser);

        if(!queryResult){
            return NextResponse.json({ success: false, message: "Failed to register user",data:["Failed to register user"] }, { status: 500 });
        }
        // generate token and send email 
        const userId = queryResult._id as unknown as Types.ObjectId;
        const token = await generateUserToken(userId.toString());
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