"use client";
import { useState } from 'react';
import { 
 
  Plus,
 
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { EmployerDashboardOverview } from '@/app/components/employers/dashboard/overview';
import { EmployerDashboardJobs } from '@/app/components/employers/dashboard/employer-dashboard-jobs';
import { EmployerDashboardApplications } from '@/app/components/employers/dashboard/employer-dahboard-applications';
import { EmployerDashboardInterviews } from '@/app/components/employers/dashboard/employer-dashboard-interviews';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const {data: session} = useSession();

  
  const tabs =[
    {
      label:"Overview",
      component:<EmployerDashboardOverview/>
    },
    {
      label:"Jobs",
      component:<EmployerDashboardJobs/>
    },
    {
      label:"Applications",
      component:<EmployerDashboardApplications/>
    },
    {
      label:"Interviews",
      component:<EmployerDashboardInterviews/>
    },
  ]
 

  const getActiveTabComponent = () => {
    const tab = tabs.find((tab) => tab.label === activeTab);
    return tab ? tab.component : null;
  };
  

 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, TechCorp Inc.</p>
              </div>
              <Link  href={"/in/employers/post-job"}   className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="w-5 h-5" />
                Post New Job
              </Link>
            </div>
          
            {/* Tabs */}
            <div className="flex gap-6 mt-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`pb-3 px-1 text-sm font-medium transition-colors capitalize ${
                    activeTab === tab.label
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
     {getActiveTabComponent()}
     
    </div>
  );
};

export default EmployerDashboard;