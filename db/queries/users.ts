import { IUser, newUser } from "@/types/user";
import connectDB from "../connection";
import User from "../models/User";
import mongoose, { HydratedDocument, Model } from "mongoose";
import { ICertification, IEducation, IPersonalInfo, ISkill, IWorkExperience } from "@/types/profile";
import { PersonalInfo } from "../models/profile/profile";
import { WorkExperience } from "../models/profile/WorkExperience";
import { Education } from "../models/profile/Education";
import { Certification } from "../models/profile/Certification";
import { Skill } from "../models/profile/Skill";

export interface ProfileResponse {
  personalInfo: IPersonalInfo | null;
  experience: IWorkExperience | null;
  education: IEducation| null;
  skills: ISkill | null;
  certifications: ICertification| null;
}


// check if email already exists
 const checkUserExists = async (email: string) => {
    await connectDB();
    const result = await User.findOne({ email });
    return !!result;
};

// register user in database
 const registerUser = async (user: newUser) => {
    await connectDB();
    const result = new User({
        email: user.email,
        full_name: user.full_name,
        password_hash: user.password,
        location: user.location
    });
    await result.save();
    return result;
};


// get user by email

const getUserByEmail = async (email: string) => {
    await connectDB();
    const result : HydratedDocument<IUser> | null = await User.findOne({ email });
    return result;
};  


// get user by id
const getUserById = async (id: string) => {
    await connectDB();
    const result : HydratedDocument<IUser> | null = await User.findById(id);
    return result;
};

// updqte user 

const updateUser = async (email: string, user: typeof User) => {
    await connectDB();
    const result = await User.findOneAndUpdate({ email }, user, { new: true });
    return result;
};

// DELETE USER BY ID  

 const deleteUserById= async (id:string)=>{
    await connectDB()
    const result = await User.findOneAndDelete({_id:id})
    return result
 }

const getProfileById = async (id: string): Promise<ProfileResponse> => {
    await connectDB();
    const [
        personalInfo,
        experience,
        education,
        skills,
        certifications
    ] = await Promise.all([
        PersonalInfo.findById(id),
        WorkExperience.findById(id),
        Education.findById(id),
        Skill.findById(id),
        Certification.findById(id)
    ]);

    return {
        personalInfo,
        experience,
        education,
        skills,
        certifications  
    };
};

const userQueries = {
    checkUserExists,
    registerUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUserById,
    getProfileById
};
export default userQueries;


