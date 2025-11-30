import { useDashboardStats } from "@/hooks/stats/useDashboardStats";
import { ArrowUpRight, Briefcase, Calendar, Clock, Eye, Filter, MapPin, MoreVertical, Search, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";

type StatItem = {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
};

 const recentApplications = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      appliedDate: '2 hours ago',
      status: 'new',
      avatar: 'SJ',
      experience: '5 years',
      location: 'New York, NY'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Designer',
      appliedDate: '5 hours ago',
      status: 'reviewing',
      avatar: 'MC',
      experience: '3 years',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Backend Engineer',
      appliedDate: '1 day ago',
      status: 'shortlisted',
      avatar: 'ER',
      experience: '4 years',
      location: 'Austin, TX'
    },
    {
      id: 4,
      name: 'James Wilson',
      position: 'Data Analyst',
      appliedDate: '2 days ago',
      status: 'interview',
      avatar: 'JW',
      experience: '2 years',
      location: 'Chicago, IL'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      position: 'UX Researcher',
      appliedDate: '3 days ago',
      status: 'rejected',
      avatar: 'LA',
      experience: '6 years',
      location: 'Seattle, WA'
    }
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      posted: '5 days ago',
      applications: 45,
      views: 320,
      status: 'active'
    },
    {
      id: 2,
      title: 'Product Designer',
      department: 'Design',
      type: 'Full-time',
      posted: '1 week ago',
      applications: 28,
      views: 180,
      status: 'active'
    },
    {
      id: 3,
      title: 'Backend Engineer',
      department: 'Engineering',
      type: 'Contract',
      posted: '2 weeks ago',
      applications: 67,
      views: 450,
      status: 'active'
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidate: 'Alex Thompson',
      position: 'Senior Frontend Developer',
      date: 'Today',
      time: '2:00 PM',
      type: 'Technical Interview',
      avatar: 'AT'
    },
    {
      id: 2,
      candidate: 'Maria Garcia',
      position: 'Product Designer',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Portfolio Review',
      avatar: 'MG'
    },
    {
      id: 3,
      candidate: 'David Kim',
      position: 'Backend Engineer',
      date: 'Dec 28',
      time: '3:30 PM',
      type: 'System Design',
      avatar: 'DK'
    }
  ];

const stats: StatItem[] = [
    { 
      label: 'Active Jobs', 
      value: '12', 
      change: '+2 this week',
      trend: 'up' as const,
      icon: Briefcase,
      color: 'blue'
    },
    { 
      label: 'Total Applications', 
      value: '248', 
      change: '+18% from last month',
      trend: 'up' as const,
      icon: Users,
      color: 'green'
    },
    { 
      label: 'Interview Scheduled', 
      value: '34', 
      change: '12 this week',
      trend: 'up' as const,
      icon: Calendar,
      color: 'purple'
    },
    { 
      label: 'Hired This Month', 
      value: '8', 
      change: '+3 from last month',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'orange'
    }
  ];



export const EmployerDashboardOverview = () => {
const [dashboardStats, setDashboardStats] = useState<StatItem[]>(stats)
const {data} = useDashboardStats()
console.log(JSON.stringify(data))

    const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-700',
      reviewing: 'bg-yellow-100 text-yellow-700',
      shortlisted: 'bg-purple-100 text-purple-700',
      interview: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };
   const getStatColor = (color:string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };


  useEffect(() => {
    if (data) {
      // Update the stats with the data from the API
      // You might want to transform the data to match the StatItem type
      // For example, if data contains the active jobs count:
      const updatedStats = [...dashboardStats];
      if (updatedStats.length > 0) {
        updatedStats[0].value = data;
        setDashboardStats(updatedStats);
      }
    }
  }, [])
    return (
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`${getStatColor(stat.color)} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Search className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentApplications.map((application) => (
                <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {application.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{application.name}</h3>
                          <p className="text-sm text-gray-600 mt-0.5">{application.position}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {application.experience}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {application.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {application.appliedDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Applications →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {interview.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm">{interview.candidate}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{interview.position}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{interview.date}, {interview.time}</span>
                      </div>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {interview.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium text-center">
                View All Interviews →
              </button>
            </div>

            {/* Active Jobs Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Jobs</h2>
              <div className="space-y-3">
                {activeJobs.map((job) => (
                  <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{job.department} • {job.type}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {job.applications}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {job.views}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{job.posted}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium text-center">
                Manage All Jobs →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}