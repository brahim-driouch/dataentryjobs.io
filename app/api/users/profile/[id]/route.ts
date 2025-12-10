import { ICertification, ICertificationDTO, IEducation, IEducationDTO, IPersonalInfoDTO, ISkill, ISkillDTO, IWorkExperience, IWorkExperienceDTO } from "@/types/profile";
import { dataTransformerToCamelCase } from "@/utils/data-transformer";
import { NextResponse } from "next/server";
import { IAPIResponse } from "@/types/api";
import { ProfileResponse } from "@/types/profile";
import profileQueries from "@/db/queries/profiles";


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

    
        const personalInfoDTO  = dataTransformerToCamelCase(profile.personalInfo) ;
        const experiencesDTO  = profile.experiences?.map((experience: IWorkExperience) => dataTransformerToCamelCase(experience)) ;
        const educationDTO  = profile.education?.map((education: IEducation) => dataTransformerToCamelCase(education)) ;
        const skillsDTO  = profile.skills?.map((skill: ISkill) => dataTransformerToCamelCase(skill)) ;
        const certificationsDTO  = profile.certifications?.map((certification: ICertification) => dataTransformerToCamelCase(certification)) ;
    
     
      
        
     const data = {
        personalInfo:personalInfoDTO,
        experiences: experiencesDTO || [],
        education: educationDTO || [],
        skills: skillsDTO || [],
        certifications: certificationsDTO || []
    }
            return NextResponse.json({success:true, message: "Profile found",data:data}, { status: 200 });
        } catch (error) {
            console.log(error)
            return NextResponse.json({success:false,     message: "Internal Server Error",data:null }, { status: 500 });
        }
    }

  