import userQueries from "@/db/queries/users";
import { IPersonalInfoDTO } from "@/types/profile";
import { dataTransformerToCamelCase } from "@/utils/data-transformer";
import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { isValidObjectId } from "mongoose";




    export async function GET(request: Request,{params}: {params: Promise<{id: string}>}) {
        
        try {
            const {id} = await params;
            if(!id){
                return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
            }

            const profile = await userQueries.getProfileByUserId(id);
            if(!profile){
                return NextResponse.json({ error: "Profile not found" }, { status: 404 });
            }

    

        const profileDTO  = dataTransformerToCamelCase({personalInfo: profile.personalInfo, experience: profile.experience, education: profile.education, skills: profile.skills, certifications: profile.certifications}) ;
    

                  if (profileDTO?.personalInfo) {
                
        if (profile?.personalInfo?._id) {
            profileDTO.personalInfo.id = profile?.personalInfo?._id.toString() || "";
        }
        if (profile?.personalInfo?.user_id) {
            profileDTO.personalInfo.userId =  profile.personalInfo.user_id.toString() || "";
        }
    }
            return NextResponse.json({
                personalInfo:profileDTO.personalInfo ,
                experience: profileDTO.experience,
                education: profileDTO.education,
                skills: profileDTO.skills,
                certifications: profileDTO.certifications
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }

  