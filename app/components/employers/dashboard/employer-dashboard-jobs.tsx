"use client";
import { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Pause, 
  Play, 
  Users, 
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { IJob, JobFormData } from '@/types/jobs';
import { useJobs } from '@/hooks/jobs/useJobs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDeleteJob } from '@/hooks/jobs/useDeleteJob';
import { useQueryClient } from '@tanstack/react-query';
import { ConfirmationPrompt } from '../../shared/confirmation-prompt';

type JobStatus = JobFormData['status'];



const statusConfig: Record<JobStatus, { label: string; color: string; bgColor: string }> = {
  active: { label: 'Active', color: 'text-green-700', bgColor: 'bg-green-50 border-green-200' },
  filled: { label: 'Filled', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  expired: { label: 'Expired', color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200' },
  pending_approval: { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-50 border-yellow-200' },
  draft: { label: 'Draft', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200' },
  rejected: { label: 'Rejected', color: 'text-red-700', bgColor: 'bg-red-50 border-red-200' }
};

export const EmployerDashboardJobs = () => {

  const {data,error} = useJobs(1,10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'all'>('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId,setSelectedId]=useState<string | null>(null)    

  const queryClient = useQueryClient();
  const router = useRouter()
  if(error){
    return <div>Error fetching jobs</div>;
  }
     const mutation = useDeleteJob();

   
  const jobs = data?.jobs
  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });


  // action functions

  const navigateToJob = (id: string) => {
    router.push(`/in/employers/jobs/${id}`);
  };

  const handleClickEdit =(id:string)=>{
    router.push(`/in/employers/jobs/edit/${id}`);
  }

  const handleDelete = async (id:string)=>{
    await mutation.mutateAsync(id);
    if(mutation.isError){
      console.log(mutation.error)
    }

       await queryClient.invalidateQueries({ queryKey: ['jobs'] });
      await queryClient.invalidateQueries({ queryKey: ['job', id] });
  } 
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 w-full flex justify-between items-start">
          <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Job Postings</h1>
          <p className="text-gray-600">Manage all your job listings in one place</p></div>
           <Link  href={"/in/employers/jobs/post-job"}   className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="w-5 h-5" />
                Post New Job
              </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Active Jobs</div>
            <div className="text-2xl font-bold text-gray-900">
              {jobs?.filter(j => j.status === 'active').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Applicants</div>
            <div className="text-2xl font-bold text-gray-900">
              {jobs?.reduce((sum, job) => sum + (job.application_count || 0), 0)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Filled Positions</div>
            <div className="text-2xl font-bold text-gray-900">
              {jobs?.filter(j => j.status === 'filled').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Draft Posts</div>
            <div className="text-2xl font-bold text-gray-900">
              {jobs?.filter(j => j.status === 'draft').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as JobStatus | 'all')}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="filled">Filled</option>
                <option value="expired">Expired</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="draft">Draft</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Table - Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Posted
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs?.map((job) => (
                <tr key={job._id as string} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.company_name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{job.location?.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{job.employment_type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(job.posted_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Users className="w-4 h-4 text-gray-400" />
                      {job.application_count}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[job.status].bgColor} ${statusConfig[job.status].color}`}>
                      {statusConfig[job.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`View applicants for ${job.title}`)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Applicants"
                      >
                        <Users className="w-4 h-4" />
                      </button>
                      <button
                        onClick={()=>navigateToJob(job._id as string)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="View Job"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                       onClick={()=>handleClickEdit(job._id as string)}
                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {job.status === 'active' ? (
                        <button
                          // onClick={() => handlePause(job.id)}
                          className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Pause Job"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          // onClick={() => handleActivate(job.id)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Activate Job"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                         onClick={()=>{setShowConfirm(true); setSelectedId(job._id as string)}}
                        className="p-2 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showConfirm && <ConfirmationPrompt setShow={setShowConfirm} variant='danger' message="Are you sure you want to delete this job?" onConfirm={() => {selectedId && handleDelete(selectedId)}} onCancel={() => setShowConfirm(false)} />}

          {filteredJobs?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Jobs Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredJobs?.map((job) => (
            <div key={job._id as string} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company_name}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[job.status].bgColor} ${statusConfig[job.status].color}`}>
                  {statusConfig[job.status].label}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Location:</span>
                  {job.location?.city}, {job.location?.country}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Type:</span>
                  {job.employment_type}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Posted:</span>
                  {new Date(job.posted_date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {job.application_count} applicants
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => alert(`View applicants for ${job.title}`)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Applicants
                </button>
                <button
                  onClick={() => alert(`View job: ${job.title}`)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => alert(`Edit job: ${job.title}`)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {job.status === 'active' ? (
                  <button
                    // onClick={() => handlePause(job.id)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                ) : (
                  <button
                    // onClick={() => handleActivate(job.id)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Activate
                  </button>
                )}
                <button
                  // onClick={() => handleDelete(job.id)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredJobs?.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No jobs found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};