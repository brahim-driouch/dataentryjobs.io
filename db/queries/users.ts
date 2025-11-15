import connectDB from "../connection";
import User from "../models/User";



// check if email already exists
export const checkEmailExists = async (email: string) => {
    await connectDB();
    const result = await User.findOne({ email });
    return result.email === email;
};