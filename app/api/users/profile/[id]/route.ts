import userQueries from "@/db/queries/users";
import { ICertificationDTO, IEducationDTO, IPersonalInfoDTO, ISkillDTO, IWorkExperienceDTO } from "@/types/profile";
import { dataTransformerToCamelCase } from "@/utils/data-transformer";
import { NextResponse } from "next/server";
import { IAPIResponse } from "@/types/api";
import { ProfileResponse } from "@/types/profile";


type APIProfileResponse = Promise<NextResponse<IAPIResponse<ProfileResponse | null>>>;

    export async function GET(request: Request,{params}: {params: Promise<{id: string}>}) : APIProfileResponse {
        
        try {
            const {id} = await params;
            if(!id){
                return NextResponse.json({ success:false, message: "Invalid ID",data:null }, { status: 400 });
            }

            const profile = await userQueries.getProfileByUserId(id);
            if(!profile){
                return NextResponse.json({success:false, message: "Profile not found",data:null }, { status: 404 });
            }

    

        const profileDTO  = dataTransformerToCamelCase({personalInfo: profile.personalInfo, experience: profile.experience, education: profile.education, skills: profile.skills, certifications: profile.certifications}) ;
    

                  if (profileDTO?.personalInfo) {
                
        if (profile?.personalInfo?._id) {
            profileDTO.personalInfo.id = profile?.personalInfo?._id.toString() || "";
        }
        if (profile?.personalInfo?.user_id) {
            profileDTO.personalInfo.userId =  profile.personalInfo.user_id.toString() || "";
        }
    }  const data = {
        personalInfo:profileDTO.personalInfo as IPersonalInfoDTO,
        experience: profileDTO.experience as IWorkExperienceDTO[],
        education: profileDTO.education as IEducationDTO[],
        skills: profileDTO.skills as ISkillDTO[],
        certifications: profileDTO.certifications as ICertificationDTO[]
    }
            return NextResponse.json({success:true, message: "Profile found",data:data}, { status: 200 });
        } catch (error) {
            console.log(error)
            return NextResponse.json({success:false,     message: "Internal Server Error",data:null }, { status: 500 });
        }
    }

  