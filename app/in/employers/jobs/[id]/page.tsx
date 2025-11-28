"use client";

import { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Pause, 
  Play, 
  Users, 
  Eye,
  EyeOff,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  Share2,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Mail,
  Globe,
  Building
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useJob } from '@/hooks/jobs/useJob';

// Mock job data
// const mockJob = {
//   _id: '1',
//   title: 'Senior Data Entry Specialist',
//   company_name: 'Tech Solutions Inc.',
//   company_logo: null,
//   description: 'We are seeking a highly skilled Senior Data Entry Specialist to join our growing team. This role involves managing large datasets, ensuring data accuracy, and maintaining our database systems.',
//   responsibilities: [
//     'Process and verify large volumes of data with high accuracy',
//     'Maintain and update database records',
//     'Generate reports and perform quality checks',
//     'Collaborate with team members to improve data processes',
//     'Train junior staff on data entry procedures'
//   ],
//   requirements: [
//     'Minimum 3 years of data entry experience',
//     'Typing speed of 60+ WPM with 98% accuracy',
//     'Proficiency in Microsoft Excel and Google Sheets',
//     'Strong attention to detail',
//     'Excellent organizational skills'
//   ],
//   category: 'General',
//   experience_level: 'Mid Level',
//   employment_type: 'Full-time',
//   location: {
//     type: 'remote',
//     country: 'United States',
//     city: 'Remote',
//     is_remote: true
//   },
//   salary: {
//     min: 45000,
//     max: 65000,
//     currency: 'USD',
//     period: 'year',
//     is_disclosed: true
//   },
//   skills: ['Microsoft Excel', 'Data Entry', 'Google Sheets', 'Database Management', 'Quality Control'],
//   certifications: ['Microsoft Office Specialist'],
//   typing_speed: {
//     min: 60,
//     required: true
//   },
//   language_requirements: ['English'],
//   application: {
//     method: 'internal',
//     instructions: 'Please submit your resume and cover letter through our application portal.'
//   },
//   status: 'active',
//   featured: true,
//   featured_until: '2024-02-28',
//   posted_date: '2024-01-15',
//   expires_date: '2024-02-28',
//   views: 1250,
//   clicks: 89,
//   application_count: 45,
//   days_until_expiration: 15,
//   is_expired: false,
//   urgent_hiring: false,
//   hiring_for_other_company: 'no',
//   createdAt: '2024-01-15',
//   updatedAt: '2024-01-20'
// };

const statusConfig = {
  active: { label: 'Active', color: 'text-green-700', bgColor: 'bg-green-100 border-green-300', icon: CheckCircle },
  filled: { label: 'Filled', color: 'text-blue-700', bgColor: 'bg-blue-100 border-blue-300', icon: CheckCircle },
  expired: { label: 'Expired', color: 'text-gray-700', bgColor: 'bg-gray-100 border-gray-300', icon: Clock },
  pending_approval: { label: 'Pending Approval', color: 'text-yellow-700', bgColor: 'bg-yellow-100 border-yellow-300', icon: Clock },
  draft: { label: 'Draft', color: 'text-purple-700', bgColor: 'bg-purple-100 border-purple-300', icon: Edit },
  rejected: { label: 'Rejected', color: 'text-red-700', bgColor: 'bg-red-100 border-red-300', icon: XCircle }
};

 const EmployerJobDetail = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'applications'>('overview');
    const params = useParams<{id:string}>();

  if(!params.id){
    return <div>Job not found</div>
  }
  const {data:job} = useJob(params.id)
  if(!job){
    return <div>Job not found</div>
  }
  const StatusIcon = statusConfig[job?.status as keyof typeof statusConfig].icon;

  const handleCopyLink = () => {
    const jobUrl = `${window.location.origin}/jobs/${job?._id}`;
    navigator.clipboard.writeText(jobUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = (newStatus: string) => {
    alert(`Status changed to: ${newStatus}`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      alert('Job deleted');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/employer/dashboard" className="hover:text-blue-600">Dashboard</a>
            <span>/</span>
            <a href="/employer/jobs" className="hover:text-blue-600">Jobs</a>
            <span>/</span>
            <span className="text-gray-900">{job.title}</span>
          </div>

          {/* Job Title and Actions */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                {job.company_logo ? (
                  <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 rounded-lg border border-gray-200" />
                ) : (
                  <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    {job.company_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-lg text-gray-600">{job.company_name}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${statusConfig[job.status as keyof typeof statusConfig].bgColor} ${statusConfig[job.status as keyof typeof statusConfig].color}`}>
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig[job.status as keyof typeof statusConfig].label}
                </span>
                {job.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-700 border border-yellow-300">
                    ⭐ Featured
                  </span>
                )}
                {job.urgent_hiring && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-100 text-red-700 border border-red-300">
                    🔥 Urgent
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={`/jobs/${job._id}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Public Page
              </a>
              <button
                onClick={() => alert('Edit job')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              {job.status === 'active' ? (
                <button
                  onClick={() => handleStatusChange('paused')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange('active')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Activate
                </button>
              )}
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'applications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Applications ({job.application_count})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Views</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{job.views}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Applications</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{job.application_count}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Clicks</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{job.clicks}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Expires In</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{job.days_until_expiration}d</div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html:job.description}}/>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
                <ul className="space-y-2">
                  {job.responsibilities.length > 0 && job.responsibilities?.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div className="font-medium text-gray-900">
                        {job.location.is_remote ? 'Remote' : `${job.location.city}, ${job.location.country}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Employment Type</div>
                      <div className="font-medium text-gray-900">{job.employment_type}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Salary</div>
                      <div className="font-medium text-gray-900">
                        {job.salary.is_disclosed
                          ? `$${job.salary.min?.toLocaleString()} - $${job.salary.max?.toLocaleString()} / ${job.salary.period}`
                          : 'Not Disclosed'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Experience Level</div>
                      <div className="font-medium text-gray-900">{job.experience_level}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Posted Date</div>
                      <div className="font-medium text-gray-900">
                        {new Date(job.posted_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Expires On</div>
                      <div className="font-medium text-gray-900">
                        {new Date(job.expires_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Method</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {job.application.method === 'internal' ? 'Internal Application' : 
                       job.application.method === 'email' ? 'Email Application' : 'External Link'}
                    </span>
                  </div>
                  {job.application.instructions && (
                    <p className="text-sm text-gray-700">{job.application.instructions}</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                    <Share2 className="w-4 h-4" />
                    Promote this Job
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                    <AlertCircle className="w-4 h-4" />
                    Report an Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Analytics</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 font-medium">Total Views</span>
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-900">{job.views}</div>
                  <div className="text-sm text-blue-600 mt-1">+12% from last week</div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-600 font-medium">Applications</span>
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-900">{job.application_count}</div>
                  <div className="text-sm text-green-600 mt-1">Conversion: {job.application_count && ((job.application_count / job.views) * 100).toFixed(1)}%</div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-600 font-medium">Apply Clicks</span>
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-900">{job.clicks}</div>
                  <div className="text-sm text-purple-600 mt-1">Click Rate: {((job.clicks / job.views) * 100).toFixed(1)}%</div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <div className="text-center text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Detailed analytics charts coming soon</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View All Applications
              </button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>Click "View All Applications" to manage applicants for this job</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerJobDetail;