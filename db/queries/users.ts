import { IUser, newUser } from "@/types/user";
import connectDB from "../connection";
import User from "../models/User";
import { HydratedDocument } from "mongoose";



// check if email already exists
 const checkEmailExists = async (email: string) => {
    await connectDB();
    const result = await User.findOne({ email });
    return result ? result.email === email : false;
};

// register user in database
 const registerUser = async (user: newUser) => {
    await connectDB();
    const result : HydratedDocument<IUser>  = await User.create({...user, password_hash: user.password});
    console.log(result);
    return result;
};


// get user by email

const getUserByEmail = async (email: string) => {
    await connectDB();
    const result : HydratedDocument<IUser> | null = await User.findOne({ email });
    return result;
};  


const dbQueries = {
    checkEmailExists,
    registerUser,
    getUserByEmail
};
export default dbQueries;


