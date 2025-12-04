"use client";

import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  CheckCircle, 
  Clock,
  TrendingUp,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Bell,
  User,
  Building2,
  ExternalLink,
  X
} from 'lucide-react';
import { getUserNameInitials } from '@/utils/formatters';
import { LoggedInUserLinks } from '@/app/components/shared/logged-in-user-links';
import { useSession } from 'next-auth/react';

// Types
type StatData = {
  currentCount: number;
  isIncrease: boolean;
  percentageChange: number;
};

type Application = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'hired';
  views: number;
};

type RecommendedJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  matchScore: number;
};

// Dashboard Stats Component
const DashboardStatsItem = ({ label, icon: IconComponent, color, data }: {
  label: string;
  icon: any;
  color: string;
  data: StatData;
}) => {
  const getStatColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color] || 'from-gray-500 to-gray-600';
  };

  const getStatBgColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-50',
      green: 'bg-green-50',
      purple: 'bg-purple-50',
      orange: 'bg-orange-50'
    };
    return colors[color] || 'bg-gray-50';
  };

  const ChangeIcon = data.isIncrease ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-4xl font-bold text-gray-900 mt-3 mb-3">
            {data.currentCount.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
              data.isIncrease ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <ChangeIcon className={`w-4 h-4 ${
                data.isIncrease ? 'text-green-600' : 'text-red-600'
              }`} />
              <span className={`text-sm font-semibold ${
                data.isIncrease ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(data.percentageChange).toFixed(1)}%
              </span>
            </div>
            <span className="text-xs text-gray-500">vs last week</span>
          </div>
        </div>
        <div className={`${getStatBgColor(color)} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
          <div className={`bg-linear-to-br ${getStatColor(color)} p-3 rounded-xl shadow-lg`}>
            <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Application Card Component
const ApplicationCard = ({ application }: { application: Application }) => {
  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
      reviewing: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      interview: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      hired: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    };
    return colors[status] || colors.pending;
  };

  const statusColors = getStatusColor(application.status);

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{application.jobTitle}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{application.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{application.location}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold">{application.salary}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{application.appliedDate}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Eye className="w-4 h-4" />
            <span>{application.views} views</span>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
          View Details
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Recommended Job Card Component
const RecommendedJobCard = ({ job }: { job: RecommendedJob }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            {job.company}
          </p>
        </div>
        <div className="bg-linear-to-br from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          {job.matchScore}% Match
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="font-bold text-gray-900">{job.salary}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{job.postedDate}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function JobSeekerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu,setShowUserMenu]=useState(false)
    const session =useSession()

    if(!session){
      return <div>loading...</div>
    }

  // Dummy Stats Data
  const stats = [
    {
      label: 'Applications Sent',
      icon: FileText,
      color: 'blue',
      data: { currentCount: 24, isIncrease: true, percentageChange: 12.5 }
    },
    {
      label: 'In Review',
      icon: Clock,
      color: 'orange',
      data: { currentCount: 8, isIncrease: false, percentageChange: 5.2 }
    },
    {
      label: 'Interviews',
      icon: TrendingUp,
      color: 'purple',
      data: { currentCount: 3, isIncrease: true, percentageChange: 50.0 }
    },
    {
      label: 'Job Offers',
      icon: CheckCircle,
      color: 'green',
      data: { currentCount: 1, isIncrease: true, percentageChange: 100.0 }
    }
  ];

  // Dummy Applications Data
  const recentApplications: Application[] = [
    {
      id: '1',
      jobTitle: 'Data Entry Specialist',
      company: 'TechCorp Solutions',
      location: 'Remote',
      salary: '$35,000 - $45,000',
      appliedDate: '2 days ago',
      status: 'reviewing',
      views: 12
    },
    {
      id: '2',
      jobTitle: 'Medical Data Entry Clerk',
      company: 'HealthFirst Medical',
      location: 'New York, NY',
      salary: '$40,000 - $50,000',
      appliedDate: '5 days ago',
      status: 'interview',
      views: 8
    },
    {
      id: '3',
      jobTitle: 'Legal Document Processor',
      company: 'LawFirm Associates',
      location: 'Remote',
      salary: '$38,000 - $48,000',
      appliedDate: '1 week ago',
      status: 'pending',
      views: 5
    },
    {
      id: '4',
      jobTitle: 'E-commerce Data Entry',
      company: 'ShopMaster Inc',
      location: 'Los Angeles, CA',
      salary: '$32,000 - $42,000',
      appliedDate: '1 week ago',
      status: 'rejected',
      views: 15
    }
  ];

  // Dummy Recommended Jobs
  const recommendedJobs: RecommendedJob[] = [
    {
      id: '1',
      title: 'Senior Data Entry Specialist',
      company: 'DataPro Systems',
      location: 'Remote',
      salary: '$45,000 - $55,000',
      type: 'Full-time',
      postedDate: 'Posted today',
      matchScore: 95
    },
    {
      id: '2',
      title: 'Financial Data Entry Clerk',
      company: 'FinanceHub LLC',
      location: 'Chicago, IL',
      salary: '$42,000 - $52,000',
      type: 'Full-time',
      postedDate: 'Posted 1 day ago',
      matchScore: 88
    },
    {
      id: '3',
      title: 'Medical Records Data Entry',
      company: 'CareConnect Health',
      location: 'Remote',
      salary: '$38,000 - $48,000',
      type: 'Part-time',
      postedDate: 'Posted 2 days ago',
      matchScore: 82
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-200 rounded-xl border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-white font-bold bg-linear-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                 {getUserNameInitials("John Doe")}
              </div>
              <div>
                <p className="text-sm text-gray-500">Welcome back, John!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div onClick={()=>setShowUserMenu(!showUserMenu)} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                 
                          {showUserMenu && <LoggedInUserLinks/>}
                    
                <User className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-8">
          {stats.map((stat, index) => (
            <DashboardStatsItem key={index} {...stat} />
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for data entry jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 flex items-center gap-2 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors">
              Search Jobs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
            </div>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <RecommendedJobCard key={job.id} job={job} />
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="mt-8 bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-white hover:bg-gray-50 rounded-xl font-medium text-gray-700 transition-colors flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Update Resume
                </button>
                <button className="w-full text-left px-4 py-3 bg-white hover:bg-gray-50 rounded-xl font-medium text-gray-700 transition-colors flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-600" />
                  Edit Profile
                </button>
                <button className="w-full text-left px-4 py-3 bg-white hover:bg-gray-50 rounded-xl font-medium text-gray-700 transition-colors flex items-center gap-3">
                  <Bell className="w-5 h-5 text-orange-600" />
                  Job Alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}