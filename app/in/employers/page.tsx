"use client";

import { EmployerDashboardApplications } from "@/app/components/employers/dashboard/employer-dahboard-applications";
import { EmployerDashboardInterviews } from "@/app/components/employers/dashboard/employer-dashboard-interviews";
import { EmployerDashboardJobs } from "@/app/components/employers/dashboard/employer-dashboard-jobs";
import { EmployerDashboardOverview } from "@/app/components/employers/dashboard/overview";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardHomePage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const { data: session } = useSession();
  const router =useRouter()

  const tabs = [
    {
      label: "Overview",
      component: <EmployerDashboardOverview />,
      link: "/in/employers?tab=overview",
    },
    {
      label: "Jobs",
      component: <EmployerDashboardJobs />,
      link: "/in/employers?tab=jobs",
    },
    {
      label: "Applications",
      component: <EmployerDashboardApplications />,
      link: "/in/employers?tab=applications",
    },
    {
      label: "Interviews",
      component: <EmployerDashboardInterviews />,
      link: "/in/employers?tab=interviews",
    },
  ];

  const getActiveTabComponent = () => {
    const tab = tabs.find((tab) => tab.label === activeTab);
    return tab ? tab.component : null;
  };
  const handleTabClick = (label:string)=>{
    setActiveTab(label)
    router.push(`/in/employers?tab=${label.toLowerCase()}`)
         
  }
  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab) {
      const tabName = tab?.charAt(0).toUpperCase() + tab?.slice(1);

      setActiveTab(tabName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, TechCorp Inc.
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mt-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={()=>handleTabClick(tab.label)}
                  className={`pb-3 px-1 text-sm font-medium transition-colors capitalize ${
                    activeTab === tab.label
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {getActiveTabComponent()}
    </div>
  );
};

export default DashboardHomePage;
