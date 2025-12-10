import profileQueries from "@/db/queries/profiles";
import { auth } from "@/lib/auth";
import { IAPIResponse } from "@/types/api";
import { IWorkExperience, IWorkExperienceDbResponse } from "@/types/profile";
import { NextResponse } from "next/server";






export async function POST(request: Request): Promise<NextResponse<IAPIResponse<IWorkExperience>>> {


    try {

        //session
        const session = await auth();
        if(!session){
            return NextResponse.json({success:false, message: "Unauthorized",data: null }, { status: 401 });
        }
        const body = await request.json();
        if(!body){
            return NextResponse.json({success:false, message: "Invalid request",data: null }, { status: 400 });
        }

        const profileExist =await  profileQueries.getProfileByUserId(session.user?.id || "");
        if(!profileExist){
            return NextResponse.json({success:false, message: "Profile not found",data: null }, { status: 404 });
        }

        if(!session.user?.id || session.user?.id !== body?.user_id){
            return NextResponse.json({success:false, message: "Unauthorized",data: null }, { status: 401 });
        }

        const added = await profileQueries.addWorkExperience(body as IWorkExperience);
        if(!added){
            return NextResponse.json({success:false, message: "Work experience not added",data: null }, { status: 404 });
        }

        return NextResponse.json({success:true, message: "Work experience added successfully",data: added  }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false, message: "Internal Server Error",data: null }, { status: 500 });
    }



}