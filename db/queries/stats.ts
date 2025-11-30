


// get Active Jobs Counts

import connectDB from "../connection";
import Application from "../models/Application";
import Job from "../models/Job";


// get active jobs count for employer
const getActiveJobsCount = async (employerId:string) => {
  try {
    await connectDB();
    const count = await Job.countDocuments({ status: 'active', employer_id: employerId });
    return count;
  } catch (error) {
    console.error('Error fetching active jobs count:', error);
    throw error;
  }
};
// get upcomming interviews count for employer

const getUpcomingInterviewsCount = async (employerId:string) => {
  try {
    await connectDB();
    const count = await Job.countDocuments({ status: 'interview', employer_id: employerId });
    return count;
  } catch (error) {
    console.error('Error fetching upcoming interviews count:', error);
    throw error;
  }
};

const getTotalApplicationsCount = async (employerId:string) => {
  try {
    await connectDB();
    const count = await Application.countDocuments({ employer_id: employerId });
    return count;
  } catch (error) {
    console.error('Error fetching total applications count:', error);
    throw error;
  }
};

const getHiredThisMonthCount = async (employerId:string) => {
  try {
    await connectDB();
    const count = await Application.countDocuments({ status: 'hired', employer_id: employerId });
    return count;
  } catch (error) {
    console.error('Error fetching hired this month count:', error);
    throw error;
  }
};




const statsQueries ={
        getActiveJobsCount,
        getUpcomingInterviewsCount,
        getTotalApplicationsCount,
        getHiredThisMonthCount
}

export default statsQueries