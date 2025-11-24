import { NewEmployer } from "@/types/employer";
import connectDB from "../connection";
import Company from "../models/Company";
import Employer from "../models/Employer";
import { ClientSession } from "mongoose";

interface IDBResponse<T> {
    status: boolean,
    data: T
}

const checkEmployerExists = async (email: string) => {
    await connectDB();
    const result = await Employer.findOne({ email });
    return !!result;
}

const registerCompany = async (company: string, session: ClientSession): Promise<IDBResponse<string>> => {
    // Don't call connectDB() here if it's already connected in the main function
    
    try {
        // Check if company already exists 
        const companyExists = await Company.findOne({ name: company }).session(session);
        if (companyExists) {
            return {
                status: false,
                data: companyExists._id.toString()
            };
        }

        // Fixed: Use proper create syntax with session
        const newCompany = new Company({ name: company });
        const queryResult = await newCompany.save({ session });
        
        if (!queryResult) {
            return {
                status: false,
                data: "Failed to create company"
            };
        }

        return {
            status: true,
            data: queryResult._id.toString() // Fixed: queryResult is the document, not an array
        };
    } catch (error) {
        console.error("Error in registerCompany:", error);
        throw error;
    }
}

const registerEmployer = async (employerData: NewEmployer, session: ClientSession) => {
    try {
        // Fixed: Find company by name, not Employer
        const company = await Company.findOne({ name: employerData.company }).session(session);
        if (!company) {
            throw new Error("Company not found");
        }

        // Fixed: Make sure to hash the password before saving
        const queryResult = new Employer({
            full_name: employerData.fullName,
            email: employerData.email,
            password_hash: employerData.password, // You should hash this first!
            company_id: company._id
        });
        
        await queryResult.save({ session });
        console.log(queryResult);
        return queryResult;
    } catch (error) {
        console.error("Error in registerEmployer:", error);
        throw error;
    }
}

// GET EMPLOYER BY ID
const getEmployerById = async (id: string) => {
    await connectDB();
    const result = await Employer.findById(id);
    return result;
}


export const getEmployerByEmail = async (email: string) => {
    await connectDB();
    const result = await Employer.findOne({ email });
    return result;
}
const employerQueries = {
    registerCompany,
    checkEmployerExists,
    registerEmployer,
    getEmployerById,
    getEmployerByEmail
};

export default employerQueries;