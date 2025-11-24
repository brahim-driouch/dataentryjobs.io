import Company from "../models/Company";



const getCompanyById = async (companyId: string) => {
  return await Company.findById(companyId);
};


const companyQueries = {
  getCompanyById,
};

export default companyQueries;
