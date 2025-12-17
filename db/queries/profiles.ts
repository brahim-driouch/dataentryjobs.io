import { ICertification, IEducation, IPersonalInfo, ISkill, IWorkExperience } from "@/types/profile";
import connectDB from "../connection";
import { PersonalInfo } from "../models/profile/profile";
import { WorkExperience } from "../models/profile/WorkExperience";
import { Education } from "../models/profile/Education";
import { Skill } from "../models/profile/Skill";
import { Certification } from "../models/profile/Certification";
import { Types } from "mongoose";


type ProfileResponse = {
    personalInfo: IPersonalInfo | null;
    experiences: IWorkExperience[] | null;
    education: IEducation[] | null;
    skills: ISkill[] | null;
    certifications: ICertification[] | null;
}

// get profile by user id
const getProfileByUserId = async (id: string): Promise<ProfileResponse> => {
    await connectDB();
    const [
        personalInfo,
        experiences,
        education,
        skills,
        certifications
    ] = await Promise.all([
        PersonalInfo.findOne({user_id:id}),
        WorkExperience.find({user_id:id}),
        Education.find({user_id:id}),
        Skill.find({user_id:id}),  
        Certification.find({user_id:id})
    ]);
    // // personalInfo ? personalInfo.id = personalInfo._id?.toString() : null;
    // // experiences?.map((experience) => {
    // //     experience._id = (experience._id as Types.ObjectId).toString()
    // //     return experience
    // // })  ;
    // // education?.map((education) => {
    // //     education._id = (education._id as Types.ObjectId).toString()
    // //     return education
    // // })  ;
    // // skills?.map((skill) => {
    // //     skill._id = (skill._id as Types.ObjectId).toString()
    // //     return skill
    // // })  ;
    // // certifications?.map((certification) => {
    // //     certification._id = (certification._id as Types.ObjectId).toString()
    // //     return certification
    // // })  ;
    
    return {
        personalInfo,
        experiences,
        education,
        skills,
        certifications  
    } as ProfileResponse;
};

// update profile #PersonalInfo
const updatePersonalInfo = async (id: string, profile: IPersonalInfo): Promise<IPersonalInfo | null> => {
    await connectDB();
    
    const result = await PersonalInfo.findOneAndUpdate({ user_id: id }, { $set: profile }, { new: true,runValidators:true });

    if(!result){
        throw new Error("Profile not updated") ;
    }
    return result;
};


// add work experience
const addWorkExperience = async ( experience: IWorkExperience): Promise<IWorkExperience | null> => {
    await connectDB();
    const result = await WorkExperience.create(experience);
    if(!result){
        throw new Error("Work experience not added") ;
    }
    return result;
};


const updateWorkExperince = async (userId:string,expId:string,experience :IWorkExperience) : Promise<IWorkExperience | null>=>{
    await connectDB()
  const {id,user_id,...updatableFields} =experience
    const updatedWorkExperience = await WorkExperience.findOneAndUpdate(
        { _id: expId,user_id:userId }, 
        { $set: updatableFields }, 
        { new: true, runValidators: true }
    );

return updatedWorkExperience;
}


const profileQueries = {
    getProfileByUserId,
    updatePersonalInfo,
    addWorkExperience,
    updateWorkExperince
}

export default profileQueries