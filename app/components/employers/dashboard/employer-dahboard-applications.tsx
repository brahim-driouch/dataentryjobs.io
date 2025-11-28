

"use client";

import { useState } from 'react';
import { 
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MessageSquare,
  Download,
  ExternalLink,
  Filter,
  Search,
  User
} from 'lucide-react';

type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'interviewed' | 'accepted' | 'rejected';

interface Application {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLocation: string;
  jobTitle: string;
  jobId: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeUrl: string;
  coverLetter: string;
  experience: string;
  rating: number;
  notes: string;
}

// Mock data
const mockApplications: Application[] = [
  {
    id: '1',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah.johnson@email.com',
    candidatePhone: '+1 (555) 123-4567',
    candidateLocation: 'San Francisco, CA',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    appliedDate: '2024-01-20',
    status: 'shortlisted',
    resumeUrl: '/resumes/sarah-johnson.pdf',
    coverLetter: 'I am excited to apply for the Senior Frontend Developer position...',
    experience: '7 years',
    rating: 5,
    notes: 'Strong React background, excellent portfolio'
  },
  {
    id: '2',
    candidateName: 'Michael Chen',
    candidateEmail: 'michael.chen@email.com',
    candidatePhone: '+1 (555) 234-5678',
    candidateLocation: 'New York, NY',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    appliedDate: '2024-01-19',
    status: 'interviewed',
    resumeUrl: '/resumes/michael-chen.pdf',
    coverLetter: 'With over 8 years of experience in frontend development...',
    experience: '8 years',
    rating: 4,
    notes: 'Great technical skills, scheduling second interview'
  },
  {
    id: '3',
    candidateName: 'Emily Rodriguez',
    candidateEmail: 'emily.r@email.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateLocation: 'Austin, TX',
    jobTitle: 'Product Designer',
    jobId: 'job-2',
    appliedDate: '2024-01-18',
    status: 'pending',
    resumeUrl: '/resumes/emily-rodriguez.pdf',
    coverLetter: 'I am passionate about creating user-centered designs...',
    experience: '5 years',
    rating: 0,
    notes: ''
  },
  {
    id: '4',
    candidateName: 'James Wilson',
    candidateEmail: 'james.wilson@email.com',
    candidatePhone: '+1 (555) 456-7890',
    candidateLocation: 'Seattle, WA',
    jobTitle: 'Backend Engineer',
    jobId: 'job-3',
    appliedDate: '2024-01-17',
    status: 'accepted',
    resumeUrl: '/resumes/james-wilson.pdf',
    coverLetter: 'I bring extensive experience in scalable backend systems...',
    experience: '6 years',
    rating: 5,
    notes: 'Excellent fit, offer accepted'
  },
  {
    id: '5',
    candidateName: 'Lisa Park',
    candidateEmail: 'lisa.park@email.com',
    candidatePhone: '+1 (555) 567-8901',
    candidateLocation: 'Boston, MA',
    jobTitle: 'Product Designer',
    jobId: 'job-2',
    appliedDate: '2024-01-16',
    status: 'rejected',
    resumeUrl: '/resumes/lisa-park.pdf',
    coverLetter: 'I would love to contribute to your design team...',
    experience: '3 years',
    rating: 2,
    notes: 'Not enough senior-level experience'
  },
  {
    id: '6',
    candidateName: 'David Kumar',
    candidateEmail: 'david.kumar@email.com',
    candidatePhone: '+1 (555) 678-9012',
    candidateLocation: 'Remote',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    appliedDate: '2024-01-15',
    status: 'reviewing',
    resumeUrl: '/resumes/david-kumar.pdf',
    coverLetter: 'As a frontend specialist with a focus on performance...',
    experience: '9 years',
    rating: 4,
    notes: 'Impressive background in performance optimization'
  }
];

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string; icon: any }> = {
  pending: { label: 'Pending', color: 'text-gray-700', bgColor: 'bg-gray-100 border-gray-300', icon: Clock },
  reviewing: { label: 'Reviewing', color: 'text-blue-700', bgColor: 'bg-blue-100 border-blue-300', icon: FileText },
  shortlisted: { label: 'Shortlisted', color: 'text-purple-700', bgColor: 'bg-purple-100 border-purple-300', icon: Star },
  interviewed: { label: 'Interviewed', color: 'text-yellow-700', bgColor: 'bg-yellow-100 border-yellow-300', icon: MessageSquare },
  accepted: { label: 'Accepted', color: 'text-green-700', bgColor: 'bg-green-100 border-green-300', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'text-red-700', bgColor: 'bg-red-100 border-red-300', icon: XCircle }
};

export const EmployerDashboardApplications = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [filterJob, setFilterJob] = useState<string>('all');

  const uniqueJobs = Array.from(new Set(applications.map(app => app.jobTitle)));

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    if (selectedApplication?.id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const handleRating = (id: string, rating: number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, rating } : app
    ));
    if (selectedApplication?.id === id) {
      setSelectedApplication({ ...selectedApplication, rating });
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesJob = filterJob === 'all' || app.jobTitle === filterJob;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const StatusIcon = selectedApplication ? statusConfig[selectedApplication.status].icon : Clock;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
          <p className="text-gray-600">Review and manage candidate applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-xs text-gray-600 mb-1">Total</div>
            <div className="text-xl font-bold text-gray-900">{applications.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-xs text-gray-600 mb-1">Pending</div>
            <div className="text-xl font-bold text-gray-700">
              {applications.filter(a => a.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200">
            <div className="text-xs text-blue-600 mb-1">Reviewing</div>
            <div className="text-xl font-bold text-blue-700">
              {applications.filter(a => a.status === 'reviewing').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-purple-200">
            <div className="text-xs text-purple-600 mb-1">Shortlisted</div>
            <div className="text-xl font-bold text-purple-700">
              {applications.filter(a => a.status === 'shortlisted').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
            <div className="text-xs text-green-600 mb-1">Accepted</div>
            <div className="text-xl font-bold text-green-700">
              {applications.filter(a => a.status === 'accepted').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-red-200">
            <div className="text-xs text-red-600 mb-1">Rejected</div>
            <div className="text-xl font-bold text-red-700">
              {applications.filter(a => a.status === 'rejected').length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search candidates or jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | 'all')}
                      className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interviewed">Interviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="flex-1 relative">
                    <select
                      value={filterJob}
                      onChange={(e) => setFilterJob(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
                    >
                      <option value="all">All Jobs</option>
                      {uniqueJobs.map(job => (
                        <option key={job} value={job}>{job}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications Cards */}
            <div className="space-y-3">
              {filteredApplications.map((app) => {
                const StatusIconComponent = statusConfig[app.status].icon;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApplication(app)}
                    className={`bg-white rounded-lg shadow-sm border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedApplication?.id === app.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {app.candidateName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.candidateName}</h3>
                          <p className="text-sm text-gray-600">{app.jobTitle}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[app.status].bgColor} ${statusConfig[app.status].color}`}>
                        <StatusIconComponent className="w-3 h-3" />
                        {statusConfig[app.status].label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {app.candidateLocation}
                      </div>
                    </div>

                    {app.rating > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= app.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredApplications.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No applications found</p>
                </div>
              )}
            </div>
          </div>

          {/* Application Details Panel */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                    {selectedApplication.candidateName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedApplication.candidateName}</h2>
                    <p className="text-sm text-gray-600">{selectedApplication.jobTitle}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${statusConfig[selectedApplication.status].bgColor} ${statusConfig[selectedApplication.status].color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig[selectedApplication.status].label}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${selectedApplication.candidateEmail}`} className="text-blue-600 hover:underline">
                      {selectedApplication.candidateEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedApplication.candidatePhone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedApplication.candidateLocation}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      Applied {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Experience</h3>
                  <p className="text-sm text-gray-700">{selectedApplication.experience}</p>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Rating</h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(selectedApplication.id, star)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= selectedApplication.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Cover Letter</h3>
                  <p className="text-sm text-gray-700 line-clamp-4">{selectedApplication.coverLetter}</p>
                </div>

                {/* Notes */}
                {selectedApplication.notes && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
                    <p className="text-sm text-gray-700">{selectedApplication.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedApplication.id, 'shortlisted')}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      <Star className="w-4 h-4" />
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplication.id, 'interviewed')}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Interview
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedApplication.id, 'accepted')}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplication.id, 'rejected')}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center sticky top-8">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Application Selected</h3>
                <p className="text-sm text-gray-600">Select an application from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};