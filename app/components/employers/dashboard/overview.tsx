import { useDashboardStats } from "@/hooks/stats/useDashboardStats";
import { ArrowDownRight, ArrowUpRight, Briefcase, Calendar, CheckCircle, Clock, Eye, Filter, MapPin, MoreVertical, Search, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardStatsItem } from "./dashboard-stats-item";


export const EmployerDashboardOverview = () => {
const {data,isLoading} = useDashboardStats()

if(isLoading || !data){
    return <div>Loading...</div>
}
console.log(data)

const dashboardStats = [
    {
      statKey: 'activeJobsStats',
      label: 'Active Jobs',
      icon: Briefcase,
      color: 'blue',
      data:data?.activeJobsStats
    },
    {
      statKey: 'totalAplicationsStats',
      label: 'Total Applications',
      icon: Users,
      color: 'green',
      data: data?.totalAplicationsStats
    },
    {
      statKey: 'upComingInterviewsStats',
      label: 'Upcoming Interviews',
      icon: Calendar,
      color: 'purple',
      data: data?.upComingInterviewsStats
    },
    {
      statKey: 'hiredThisMonthStats',
      label: 'Hired This Month',
      icon: CheckCircle,
      color: 'orange',
      data: data?.hiredThisMonthStats
    }
  ]
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


    return (
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {dashboardStats.map((statItem) => (
    <DashboardStatsItem key={statItem.statKey} {...statItem} />
  ))}
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
              {/* {recentApplications?.map((application) => (
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
              ))} */}
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
                {/* {upcomingInterviews.map((interview) => (
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
                ))} */}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium text-center">
                View All Interviews →
              </button>
            </div>

            {/* Active Jobs Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Jobs</h2>
              <div className="space-y-3">
                {/* {activeJobs.map((job) => (
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
                ))} */}
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