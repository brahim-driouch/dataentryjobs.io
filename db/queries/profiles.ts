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
        PersonalInfo.findOne({user_id:id}).select("-__v  -isNew").lean(),
        WorkExperience.find({user_id:id}).select("-__v  -isNew").lean(),
        Education.find({user_id:id}).select("-__v -isNew").lean(),
        Skill.find({user_id:id}).select("-__v -isNew").lean(),  
        Certification.find({user_id:id}).select("-__v -isNew").lean()
    ]);
    personalInfo ? personalInfo.id = personalInfo._id?.toString() : null;
    experiences?.map((experience) => {
        experience._id = (experience._id as Types.ObjectId).toString()
        return experience
    })  ;
    education?.map((education) => {
        education._id = (education._id as Types.ObjectId).toString()
        return education
    })  ;
    skills?.map((skill) => {
        skill._id = (skill._id as Types.ObjectId).toString()
        return skill
    })  ;
    certifications?.map((certification) => {
        certification._id = (certification._id as Types.ObjectId).toString()
        return certification
    })  ;
    
    return {
        personalInfo,
        experiences,
        education,
        skills,
        certifications  
    } as unknown as  ProfileResponse;
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



const profileQueries = {
    getProfileByUserId,
    updatePersonalInfo,
    addWorkExperience
}

export default profileQueries