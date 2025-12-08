import { IUser } from "@/types/user";
import connectDB from "../connection";
import User from "../models/User";
import { HydratedDocument } from "mongoose";
import { ICertification, ICertificationDbResponse, IEducation, IEducationDbResponse, IPersonalInfo, IPersonalInfoDbResponse, IProfile, ISkill, ISkillDbResponse, IWorkExperience, IWorkExperienceDbResponse } from "@/types/profile";
import { PersonalInfo } from "../models/profile/profile";
import { WorkExperience } from "../models/profile/WorkExperience";
import { Education } from "../models/profile/Education";
import { Certification } from "../models/profile/Certification";
import { Skill } from "../models/profile/Skill";
import { dataTransformerToSnakeCase } from "@/utils/data-transformer";
import mongoose from "mongoose";
export interface ProfileResponse {
  personalInfo: IPersonalInfoDbResponse | null;
  experience: IWorkExperienceDbResponse[] | null;
  education: IEducationDbResponse[] | null;
  skills: ISkillDbResponse[] | null;
  certifications: ICertificationDbResponse[] | null;
}


// check if email already exists
 const checkUserExists = async (email: string) => {
    await connectDB();
    const result = await User.findOne({ email });
    return !!result;
};

// register user in database
const registerUser = async (user: IUser) => {
  await connectDB();
  
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();
    
    // Create user within transaction
    const newUser = new User(user);
    await newUser.save({ session });

      const flattenedUser = dataTransformerToSnakeCase(user);
      const newProfile = new PersonalInfo({
        user_id: newUser._id,
        full_name: flattenedUser.full_name, // Use fullName to match schema
        email: flattenedUser.email,
        location: {
          country: newUser.location.country,
          city: "",
          country_code: flattenedUser.location.country_code,
          state: "",
          timezone: ""
        }
      });
     
      await newProfile.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    
    return newUser;
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    throw error;
  } finally {
    // End session
    session.endSession();
  }
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

const getProfileByUserId = async (id: string): Promise<ProfileResponse> => {
    await connectDB();
    const [
        personalInfo,
        experience,
        education,
        skills,
        certifications
    ] = await Promise.all([
        PersonalInfo.findOne({user_id:id}).select("-__v  -isNew").lean(),
        WorkExperience.find({user_id:id}).select("-__v -_id -isNew").lean(),
        Education.find({user_id:id}).select("-__v -_id -isNew").lean(),
        Skill.find({user_id:id}).select("-__v -_id -isNew").lean(),
        Certification.find({user_id:id}).select("-__v -_id -isNew").lean()
    ]);

   console.log(personalInfo)
    return {
        personalInfo,
        experience,
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





const userQueries = {
    checkUserExists,
    registerUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUserById,
    getProfileByUserId,
    updatePersonalInfo    
};
export default userQueries;


