"use client";

import { useState } from 'react';
import { 
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  Building,
  User,
  Mail,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  AlertCircle,
  MessageSquare,
  FileText
} from 'lucide-react';

type InterviewType = 'video' | 'phone' | 'in-person';
type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  jobId: string;
  date: string;
  time: string;
  duration: number;
  type: InterviewType;
  status: InterviewStatus;
  location?: string;
  meetingLink?: string;
  interviewers: string[];
  notes: string;
  round: number;
  feedback?: string;
}

// Mock data
const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah.johnson@email.com',
    candidatePhone: '+1 (555) 123-4567',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    date: '2024-01-25',
    time: '10:00',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    interviewers: ['John Smith', 'Emily Chen'],
    notes: 'Technical interview - focus on React and TypeScript',
    round: 2
  },
  {
    id: '2',
    candidateName: 'Michael Chen',
    candidateEmail: 'michael.chen@email.com',
    candidatePhone: '+1 (555) 234-5678',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    date: '2024-01-25',
    time: '14:00',
    duration: 45,
    type: 'phone',
    status: 'scheduled',
    interviewers: ['Sarah Williams'],
    notes: 'Initial screening call',
    round: 1
  },
  {
    id: '3',
    candidateName: 'Emily Rodriguez',
    candidateEmail: 'emily.r@email.com',
    candidatePhone: '+1 (555) 345-6789',
    jobTitle: 'Product Designer',
    jobId: 'job-2',
    date: '2024-01-24',
    time: '11:00',
    duration: 90,
    type: 'in-person',
    status: 'completed',
    location: '123 Main St, Suite 400, San Francisco, CA',
    interviewers: ['Mark Johnson', 'Lisa Park', 'Tom Brown'],
    notes: 'Portfolio review and design challenge',
    round: 3,
    feedback: 'Strong portfolio, excellent communication skills. Recommended for hire.'
  },
  {
    id: '4',
    candidateName: 'James Wilson',
    candidateEmail: 'james.wilson@email.com',
    candidatePhone: '+1 (555) 456-7890',
    jobTitle: 'Backend Engineer',
    jobId: 'job-3',
    date: '2024-01-26',
    time: '15:30',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    meetingLink: 'https://zoom.us/j/123456789',
    interviewers: ['Alex Kumar', 'Rachel Green'],
    notes: 'System design discussion',
    round: 2
  },
  {
    id: '5',
    candidateName: 'Lisa Park',
    candidateEmail: 'lisa.park@email.com',
    candidatePhone: '+1 (555) 567-8901',
    jobTitle: 'Product Designer',
    jobId: 'job-2',
    date: '2024-01-23',
    time: '09:00',
    duration: 30,
    type: 'phone',
    status: 'no-show',
    interviewers: ['Sarah Williams'],
    notes: 'Candidate did not attend scheduled call',
    round: 1
  },
  {
    id: '6',
    candidateName: 'David Kumar',
    candidateEmail: 'david.kumar@email.com',
    candidatePhone: '+1 (555) 678-9012',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    date: '2024-01-22',
    time: '16:00',
    duration: 45,
    type: 'video',
    status: 'cancelled',
    meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    interviewers: ['John Smith'],
    notes: 'Candidate requested to reschedule',
    round: 1
  },
  {
    id: '7',
    candidateName: 'Anna Martinez',
    candidateEmail: 'anna.m@email.com',
    candidatePhone: '+1 (555) 789-0123',
    jobTitle: 'Backend Engineer',
    jobId: 'job-3',
    date: '2024-01-27',
    time: '10:30',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    meetingLink: 'https://meet.google.com/pqr-stuv-wxy',
    interviewers: ['Alex Kumar'],
    notes: 'Coding challenge review',
    round: 2
  }
];

const interviewTypeConfig: Record<InterviewType, { label: string; icon: any; color: string }> = {
  video: { label: 'Video Call', icon: Video, color: 'text-blue-600' },
  phone: { label: 'Phone Call', icon: Phone, color: 'text-green-600' },
  'in-person': { label: 'In Person', icon: Building, color: 'text-purple-600' }
};

const statusConfig: Record<InterviewStatus, { label: string; color: string; bgColor: string; icon: any }> = {
  scheduled: { label: 'Scheduled', color: 'text-blue-700', bgColor: 'bg-blue-100 border-blue-300', icon: Clock },
  completed: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-100 border-green-300', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100 border-red-300', icon: XCircle },
  'no-show': { label: 'No Show', color: 'text-orange-700', bgColor: 'bg-orange-100 border-orange-300', icon: AlertCircle },
  rescheduled: { label: 'Rescheduled', color: 'text-yellow-700', bgColor: 'bg-yellow-100 border-yellow-300', icon: Calendar }
};

export const EmployerDashboardInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<InterviewStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<InterviewType | 'all'>('all');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const handleStatusChange = (id: string, newStatus: InterviewStatus) => {
    setInterviews(interviews.map(int => 
      int.id === id ? { ...int, status: newStatus } : int
    ));
    if (selectedInterview?.id === id) {
      setSelectedInterview({ ...selectedInterview, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this interview?')) {
      setInterviews(interviews.filter(int => int.id !== id));
      if (selectedInterview?.id === id) {
        setSelectedInterview(null);
      }
    }
  };

  const filteredInterviews = interviews.filter(int => {
    const matchesSearch = int.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         int.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || int.status === filterStatus;
    const matchesType = filterType === 'all' || int.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const upcomingInterviews = filteredInterviews.filter(int => 
    int.status === 'scheduled' && new Date(`${int.date} ${int.time}`) > new Date()
  );

  const todayInterviews = filteredInterviews.filter(int => {
    const today = new Date().toISOString().split('T')[0];
    return int.date === today && int.status === 'scheduled';
  });

  const TypeIcon = selectedInterview ? interviewTypeConfig[selectedInterview.type].icon : Video;
  const StatusIcon = selectedInterview ? statusConfig[selectedInterview.status].icon : Clock;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interviews</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Schedule Interview
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-xs text-gray-600 mb-1">Today</div>
            <div className="text-2xl font-bold text-gray-900">{todayInterviews.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200">
            <div className="text-xs text-blue-600 mb-1">Upcoming</div>
            <div className="text-2xl font-bold text-blue-700">{upcomingInterviews.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
            <div className="text-xs text-green-600 mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-700">
              {interviews.filter(i => i.status === 'completed').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-red-200">
            <div className="text-xs text-red-600 mb-1">Cancelled</div>
            <div className="text-2xl font-bold text-red-700">
              {interviews.filter(i => i.status === 'cancelled').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-orange-200">
            <div className="text-xs text-orange-600 mb-1">No Show</div>
            <div className="text-2xl font-bold text-orange-700">
              {interviews.filter(i => i.status === 'no-show').length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interviews List */}
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
                      onChange={(e) => setFilterStatus(e.target.value as InterviewStatus | 'all')}
                      className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No Show</option>
                      <option value="rescheduled">Rescheduled</option>
                    </select>
                  </div>

                  <div className="flex-1 relative">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as InterviewType | 'all')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="in-person">In Person</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Interviews */}
            {todayInterviews.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Today's Interviews</h2>
                <div className="space-y-3">
                  {todayInterviews.map((interview) => {
                    const TypeIconComponent = interviewTypeConfig[interview.type].icon;
                    const StatusIconComponent = statusConfig[interview.status].icon;
                    return (
                      <div
                        key={interview.id}
                        onClick={() => setSelectedInterview(interview)}
                        className={`bg-linear-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                          selectedInterview?.id === interview.id 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-blue-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {interview.candidateName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{interview.candidateName}</h3>
                              <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[interview.status].bgColor} ${statusConfig[interview.status].color}`}>
                            <StatusIconComponent className="w-3 h-3" />
                            {statusConfig[interview.status].label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <Clock className="w-4 h-4 text-blue-600" />
                            {interview.time} ({interview.duration} min)
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <TypeIconComponent className={`w-4 h-4 ${interviewTypeConfig[interview.type].color}`} />
                            {interviewTypeConfig[interview.type].label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Interviews */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {todayInterviews.length > 0 ? 'All Interviews' : 'Interviews'}
              </h2>
              <div className="space-y-3">
                {filteredInterviews.map((interview) => {
                  const TypeIconComponent = interviewTypeConfig[interview.type].icon;
                  const StatusIconComponent = statusConfig[interview.status].icon;
                  const isToday = todayInterviews.some(t => t.id === interview.id);
                  
                  if (isToday && todayInterviews.length > 0) return null;
                  
                  return (
                    <div
                      key={interview.id}
                      onClick={() => setSelectedInterview(interview)}
                      className={`bg-white rounded-lg shadow-sm border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedInterview?.id === interview.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {interview.candidateName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{interview.candidateName}</h3>
                            <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[interview.status].bgColor} ${statusConfig[interview.status].color}`}>
                          <StatusIconComponent className="w-3 h-3" />
                          {statusConfig[interview.status].label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          {interview.time} ({interview.duration} min)
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 col-span-2">
                          <TypeIconComponent className={`w-4 h-4 ${interviewTypeConfig[interview.type].color}`} />
                          {interviewTypeConfig[interview.type].label}
                        </div>
                      </div>

                      {interview.round > 1 && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-700">
                            Round {interview.round}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredInterviews.length === 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No interviews found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interview Details Panel */}
          <div className="lg:col-span-1">
            {selectedInterview ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                    {selectedInterview.candidateName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedInterview.candidateName}</h2>
                    <p className="text-sm text-gray-600">{selectedInterview.jobTitle}</p>
                  </div>
                </div>

                {/* Status & Type */}
                <div className="flex gap-2 mb-6">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${statusConfig[selectedInterview.status].bgColor} ${statusConfig[selectedInterview.status].color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig[selectedInterview.status].label}
                  </span>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-gray-50 text-gray-700`}>
                    <TypeIcon className={`w-4 h-4 ${interviewTypeConfig[selectedInterview.type].color}`} />
                    {interviewTypeConfig[selectedInterview.type].label}
                  </span>
                </div>

                {/* Interview Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 font-medium">
                      {new Date(selectedInterview.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedInterview.time} - {selectedInterview.duration} minutes</span>
                  </div>
                  
                  {selectedInterview.type === 'video' && selectedInterview.meetingLink && (
                    <div className="flex items-start gap-3 text-sm">
                      <Video className="w-4 h-4 text-gray-400 mt-0.5" />
                      <a 
                        href={selectedInterview.meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {selectedInterview.meetingLink}
                      </a>
                    </div>
                  )}
                  
                  {selectedInterview.type === 'in-person' && selectedInterview.location && (
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{selectedInterview.location}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${selectedInterview.candidateEmail}`} className="text-blue-600 hover:underline">
                      {selectedInterview.candidateEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedInterview.candidatePhone}</span>
                  </div>
                </div>

                {/* Round Info */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Interview Round</h3>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                    Round {selectedInterview.round}
                  </span>
                </div>

                {/* Interviewers */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Interviewers</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterview.interviewers.map((interviewer, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-700 border border-gray-200"
                      >
                        <User className="w-3 h-3" />
                        {interviewer}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {selectedInterview.notes}
                  </p>
                </div>

                {/* Feedback */}
                {selectedInterview.feedback && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Feedback</h3>
                    <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                      {selectedInterview.feedback}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  {selectedInterview.status === 'scheduled' && (
                    <>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
                          <Calendar className="w-4 h-4" />
                          Reschedule
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleStatusChange(selectedInterview.id, 'completed')}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Complete Interview 
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedInterview.id, 'cancelled')}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel Interview
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Interview Selected</h3>
                <p className="text-gray-500">Select an interview to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};