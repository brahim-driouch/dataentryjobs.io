import { NextResponse } from "next/server";
import { IAPIResponse } from "@/types/api";
import profileQueries from "@/db/queries/profiles";
import { ProfileResponse } from "@/types/profile";


type APIProfileResponse = Promise<NextResponse<IAPIResponse<ProfileResponse | null>>>;

    export async function GET(request: Request,{params}: {params: Promise<{id: string}>}) : APIProfileResponse {
        
        try {
            const {id} = await params;
            if(!id){
                return NextResponse.json({ success:false, message: "Invalid ID",data:null }, { status: 400 });
            }

            const profile = await profileQueries.getProfileByUserId(id);
            if(!profile){
                return NextResponse.json({success:false, message: "Profile not found",data:null }, { status: 404 });
            }

    
        
    
     
      
        

            return NextResponse.json({success:true, message: "Profile found",data:profile as ProfileResponse}, { status: 200 });

        } catch (error) {
            console.log(error)
            return NextResponse.json({success:false,     message: "Internal Server Error",data:null }, { status: 500 });
        }
    }

  