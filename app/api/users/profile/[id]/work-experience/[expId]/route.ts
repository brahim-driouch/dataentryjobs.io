import profileQueries from "@/db/queries/profiles";
import { auth } from "@/lib/auth";
import { IAPIResponse } from "@/types/api";
import { IWorkExperience, IWorkExperienceDTO } from "@/types/profile";
import { NextRequest, NextResponse } from "next/server";





type WorkExperienceApiResponse = Promise<NextResponse<IAPIResponse<IWorkExperience | null>>>

export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string,expId:string}>}):WorkExperienceApiResponse {

    try {
        const session = await auth();

        if(!session){
            return NextResponse.json({
                  success:false,
                  message:"UNAUTHORIZED",
                  data:null
            },{status:401})
        }

       const {id,expId} = await params

    if(!id || !expId) {
            return NextResponse.json({
                success: false,
                message: "Invalid ID parameters",
                data: null
            },{status:400})
        }
 
        const body = await request.json() as IWorkExperience
        if(!body){
            return NextResponse.json({
                success: false,
                message: "Invalid request body",
                data: null
            },{status:400})
        }
        if(session.user.id !== id){
            return NextResponse.json({
                success:false,
                message:"UNAUTHORIZED",
                data:null
            },{status:401})
        }


        const result = await profileQueries.updateWorkExperince(id, expId, body)
        if(!result){
            return NextResponse.json({
                success:false,
                message:"Error: Record not updated",
                data:null
            })
        }
        return NextResponse.json({
            success:true,
            message:"Updated successfully",
            data:result
        })
        
    } catch (error) {

     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
     console.error("Error updating work experience:", errorMessage);
     return NextResponse.json({
        success:false,
        message:errorMessage,
        data:null
     })
    }

}