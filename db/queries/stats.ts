


// get Active Jobs Counts

import connectDB from "../connection";
import Application from "../models/Application";
import Job from "../models/Job";

export interface StatsResponse {
  currentCount: number;
  lastWeekCount: number;
  percentageChange: number;
  isIncrease: boolean;
}
// get active jobs count for employer
const getActiveJobsStats= async (employerId: string): Promise<StatsResponse> => {
  try {
    await connectDB();

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    // Current active jobs
    const currentCount = await Job.countDocuments({
      status: 'active',
      employer_id: employerId
    });

    // Jobs that were posted more than 7 days ago and are still active
    const activeJobsFrom7DaysAgo = await Job.countDocuments({
      status: 'active',
      employer_id: employerId,
      posted_date: { $lt: sevenDaysAgo }
    });

  

    // Last week's count = current active old jobs (existed 7 days ago)
    const lastWeekCount = activeJobsFrom7DaysAgo;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastWeekCount > 0) {
      percentageChange = ((currentCount - lastWeekCount) / lastWeekCount) * 100;
    } else if (currentCount > 0) {
      percentageChange = 100;
    }

    return {
      currentCount,
      lastWeekCount,
      percentageChange: Math.round(percentageChange * 10) / 10,
      isIncrease: percentageChange >= 0
    };
  } catch (error) {
    console.error('Error fetching active jobs count:', error);
    throw error;
  }
};
// get upcomming interviews count for employer

const getUpcomingInterviewsStats = async (employerId:string) => {
  try {
    await connectDB();
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const currentCount = await Job.countDocuments({ status: 'interview', employer_id: employerId });
    
    const lastWeekCount = await Job.countDocuments({ status: 'interview', employer_id: employerId, createdAt: { $gte: sevenDaysAgo } });
    
    let percentageChange = 0;
    if (lastWeekCount > 0) {
      percentageChange = ((currentCount - lastWeekCount) / lastWeekCount) * 100;
    } else if (currentCount > 0) {
      percentageChange = 100;
    }
    return {
        currentCount,
      lastWeekCount,
      percentageChange: Math.round(percentageChange * 10) / 10,
      isIncrease: percentageChange >= 0
    };
  } catch (error) {
    console.error('Error fetching upcoming interviews count:', error);
    throw error;
  }
};

const getApplicationsStats = async (employerId: string): Promise<StatsResponse> => {
  try {
    await connectDB();

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    
    const fourteenDaysAgo = new Date(now);
    fourteenDaysAgo.setDate(now.getDate() - 14);

    // Applications in the last 7 days
    const currentCount = await Application.countDocuments({
      employer_id: employerId,
      createdAt: { $gte: sevenDaysAgo }
    });

    // Applications from 7-14 days ago
    const lastWeekCount = await Application.countDocuments({
      employer_id: employerId,
      createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo }
    });

    // Calculate percentage change
    let percentageChange = 0;
    if (lastWeekCount > 0) {
      percentageChange = ((currentCount - lastWeekCount) / lastWeekCount) * 100;
    } else if (currentCount > 0) {
      percentageChange = 100;
    }

    return {
      currentCount,
      lastWeekCount,
      percentageChange: Math.round(percentageChange * 10) / 10,
      isIncrease: percentageChange >= 0
    };
  } catch (error) {
    console.error('Error fetching applications stats:', error);
    throw error;
  }
}

const getHiredThisMonthCountStats = async (employerId:string) => {
  try {
    await connectDB();
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const count = await Application.countDocuments({ status: 'hired', employer_id: employerId, createdAt: { $gte: thisMonth } });
    const lastMonthCount = await Application.countDocuments({ status: 'hired', employer_id: employerId, createdAt: { $gte: lastMonth, $lt: thisMonth } });
    let percentageChange = 0;
    if (lastMonthCount > 0) {
      percentageChange = ((count - lastMonthCount) / lastMonthCount) * 100;
    } else if (count > 0) {
      percentageChange = 100;
    }
    return {
      count,
      lastMonthCount,
      percentageChange: Math.round(percentageChange * 10) / 10,
      isIncrease: percentageChange >= 0
    };
  } catch (error) {
    console.error('Error fetching hired this month count:', error);
    throw error;
  }
};




const statsQueries ={
        getActiveJobsStats,
        getUpcomingInterviewsStats,
        getApplicationsStats,
        getHiredThisMonthCountStats
}

export default statsQueries