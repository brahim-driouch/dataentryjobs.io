import { validateNewUser } from "@/lib/data-validator";
import { IAPIResponse } from "@/types/api";
import { NextResponse } from "next/server";
import { success } from "zod";





export async function POST(req: Request): Promise<NextResponse<IAPIResponse<string[]>>> {
    const { email, password , confirmPassword} = await req.json();
    
    try {
      
        const {isValid, errors} = validateNewUser(email, password, confirmPassword);
        if(!isValid){
            return NextResponse.json({ success: false, message: "Failed to register user",data:errors }, { status: 400 });
        }
       // check if user already exists


        return NextResponse.json({ success: true, message: "User registered successfully",data:true }, { status: 201 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to register user",data:false }, { status: 500 });
    }
}