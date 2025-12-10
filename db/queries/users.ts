import { IUser } from "@/types/user";
import connectDB from "../connection";
import User from "../models/User";
import { HydratedDocument } from "mongoose";
import { dataTransformerToSnakeCase } from "@/utils/data-transformer";
import mongoose from "mongoose";
import { PersonalInfo } from "../models/profile/profile";



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







const userQueries = {
    checkUserExists,
    registerUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUserById,

};
export default userQueries;


