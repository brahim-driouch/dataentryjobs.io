import userQueries from "@/db/queries/users";
import { auth } from "@/lib/auth";
import { IAPIResponse } from "@/types/api";
import { IPersonalInfo } from "@/types/profile";
import { NextResponse } from "next/server";

  export async function PUT(request: Request,{params}: {params: Promise<{id: string}>}): Promise<NextResponse<IAPIResponse<IPersonalInfo>>> {
    try {
        const session = await auth();

        if(!session){
            return NextResponse.json({success:false, message: "Unauthorized",data: null }, { status: 401 });
        }
        const {id} = await params;
        if(!id){
            return NextResponse.json({success:false, message: "Invalid ID",data: null }, { status: 400 });
        }
        const body = await request.json();
        if(!body){
            return NextResponse.json({success:false, message: "Invalid request",data: null }, { status: 400 });
        }
               // user can not change email and name for now

        if(body.email !== session.user?.email.trim()){
            return NextResponse.json({success:false, message: "You can not change email",data: null }, { status: 401 });
        }

        
        const profileExist = userQueries.getProfileByUserId(id);
        if(!profileExist){
            return NextResponse.json({success:false, message: "Profile not found",data: null }, { status: 404 });
        }

       const updated = await userQueries.updatePersonalInfo(id, body as IPersonalInfo);
       if(!updated){
           return NextResponse.json({success:false, message: "Profile not updated",data: null }, { status: 404 });
       }

       return NextResponse.json({success:true, message: "Profile updated successfully",data: updated }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false, message: "Internal Server Error",data: null }, { status: 500 });
    }
}