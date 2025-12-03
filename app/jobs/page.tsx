"use client";

import React, { useState } from 'react';
import { 
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Building2,
  Filter,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  Star,
  Users,
  ExternalLink,
  X,
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Types
type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  locationType: 'Remote' | 'On-site' | 'Hybrid';
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  category: 'Medical' | 'General' | 'Legal' | 'Ecommerce' | 'Finance' | 'Logistics';
  postedDate: string;
  description: string;
  requirements: string[];
  isFeatured: boolean;
  applicants: number;
  saved: boolean;
};

// Job Card Component
const JobCard = ({ job, onSave }: { job: Job; onSave: (id: string) => void }) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Medical: 'bg-red-50 text-red-700 border-red-200',
      General: 'bg-gray-50 text-gray-700 border-gray-200',
      Legal: 'bg-blue-50 text-blue-700 border-blue-200',
      Ecommerce: 'bg-purple-50 text-purple-700 border-purple-200',
      Finance: 'bg-green-50 text-green-700 border-green-200',
      Logistics: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className={`bg-white rounded-2xl p-6 border ${job.isFeatured ? 'border-yellow-300 shadow-lg' : 'border-gray-100'} hover:shadow-xl transition-all duration-300 group relative`}>
      {job.isFeatured && (
        <div className="absolute -top-3 left-6 bg-linear-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3 fill-white" />
          Featured Job
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-gray-700">
              <Building2 className="w-4 h-4" />
              <span className="font-semibold">{job.company}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(job.category)}`}>
              {job.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {job.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              {job.locationType}
            </span>
          </div>
        </div>
        <button
          onClick={() => onSave(job.id)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {job.saved ? (
            <BookmarkCheck className="w-6 h-6 text-blue-600 fill-blue-600" />
          ) : (
            <Bookmark className="w-6 h-6 text-gray-400" />
          )}
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-green-600 font-bold">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{job.postedDate}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Users className="w-4 h-4" />
            <span>{job.applicants}</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 group">
          Apply
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Filter Checkbox Component
const FilterCheckbox = ({ 
  label, 
  count, 
  checked, 
  onChange 
}: { 
  label: string; 
  count: number; 
  checked: boolean; 
  onChange: () => void;
}) => {
  return (
    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {label}
        </span>
      </div>
      <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
        {count}
      </span>
    </label>
  );
};

// Salary Range Slider Component
const SalaryRangeSlider = ({ 
  value, 
  onChange 
}: { 
  value: number; 
  onChange: (value: number) => void;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Min Salary</span>
        <span className="text-sm font-bold text-blue-600">${value.toLocaleString()}</span>
      </div>
      <input
        type="range"
        min="25000"
        max="80000"
        step="5000"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>$25k</span>
        <span>$80k</span>
      </div>
    </div>
  );
};

// Main Job Listings Page
export default function JobListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [minSalary, setMinSalary] = useState(30000);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);

  // Dummy Jobs Data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Data Entry Specialist',
      company: 'HealthCare Solutions Inc.',
      location: 'New York, NY',
      locationType: 'Hybrid',
      salary: '$45,000 - $55,000',
      type: 'Full-time',
      category: 'Medical',
      postedDate: 'Posted today',
      description: 'We are seeking an experienced data entry specialist to manage patient records and medical documentation. Must have excellent attention to detail and HIPAA knowledge.',
      requirements: ['3+ years experience', 'HIPAA certified', 'Medical terminology knowledge'],
      isFeatured: true,
      applicants: 24,
      saved: false
    },
    {
      id: '2',
      title: 'Legal Document Data Entry Clerk',
      company: 'LawFirm Associates',
      location: 'Remote',
      locationType: 'Remote',
      salary: '$38,000 - $48,000',
      type: 'Full-time',
      category: 'Legal',
      postedDate: 'Posted 1 day ago',
      description: 'Join our legal team to process and enter legal documents, contracts, and case files. Experience with legal terminology preferred.',
      requirements: ['Legal terminology', 'Fast typing speed', 'Confidentiality'],
      isFeatured: false,
      applicants: 18,
      saved: true
    },
    {
      id: '3',
      title: 'E-commerce Product Data Entry',
      company: 'ShopMaster Online',
      location: 'Los Angeles, CA',
      locationType: 'Remote',
      salary: '$32,000 - $42,000',
      type: 'Full-time',
      category: 'Ecommerce',
      postedDate: 'Posted 2 days ago',
      description: 'Enter product information, descriptions, and pricing data for our e-commerce platform. Must be detail-oriented and comfortable with spreadsheets.',
      requirements: ['Excel proficiency', 'E-commerce experience', 'Fast typing'],
      isFeatured: true,
      applicants: 45,
      saved: false
    },
    {
      id: '4',
      title: 'Financial Data Entry Specialist',
      company: 'FinanceHub LLC',
      location: 'Chicago, IL',
      locationType: 'On-site',
      salary: '$42,000 - $52,000',
      type: 'Full-time',
      category: 'Finance',
      postedDate: 'Posted 3 days ago',
      description: 'Process financial transactions, invoices, and accounting data. CPA firm experience is a plus.',
      requirements: ['Accounting knowledge', 'QuickBooks', '2+ years experience'],
      isFeatured: false,
      applicants: 32,
      saved: false
    },
    {
      id: '5',
      title: 'Part-Time Data Entry Assistant',
      company: 'Administrative Services Pro',
      location: 'Remote',
      locationType: 'Remote',
      salary: '$18 - $25/hour',
      type: 'Part-time',
      category: 'General',
      postedDate: 'Posted 4 days ago',
      description: 'Flexible part-time position for general data entry tasks. Perfect for students or those seeking additional income.',
      requirements: ['Flexible schedule', 'Basic computer skills', 'Reliable internet'],
      isFeatured: false,
      applicants: 67,
      saved: false
    },
    {
      id: '6',
      title: 'Logistics Data Entry Coordinator',
      company: 'FreightMaster Logistics',
      location: 'Dallas, TX',
      locationType: 'Hybrid',
      salary: '$40,000 - $50,000',
      type: 'Full-time',
      category: 'Logistics',
      postedDate: 'Posted 5 days ago',
      description: 'Manage shipment data, tracking information, and inventory records for our logistics operations.',
      requirements: ['Logistics experience', 'WMS knowledge', 'Detail-oriented'],
      isFeatured: false,
      applicants: 28,
      saved: true
    },
    {
      id: '7',
      title: 'Medical Records Data Entry',
      company: 'CareConnect Health',
      location: 'Boston, MA',
      locationType: 'On-site',
      salary: '$38,000 - $46,000',
      type: 'Full-time',
      category: 'Medical',
      postedDate: 'Posted 1 week ago',
      description: 'Enter and maintain electronic health records (EHR) with high accuracy. HIPAA compliance required.',
      requirements: ['EHR systems', 'HIPAA training', 'Medical terminology'],
      isFeatured: false,
      applicants: 41,
      saved: false
    },
    {
      id: '8',
      title: 'Contract Data Entry Specialist',
      company: 'DataPro Services',
      location: 'Remote',
      locationType: 'Remote',
      salary: '$35 - $45/hour',
      type: 'Contract',
      category: 'General',
      postedDate: 'Posted 1 week ago',
      description: '3-month contract position for high-volume data entry project. Opportunity for extension based on performance.',
      requirements: ['80+ WPM typing', 'Data verification', 'Available immediately'],
      isFeatured: true,
      applicants: 89,
      saved: false
    }
  ]);

  const handleSaveJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleLocationType = (locationType: string) => {
    setSelectedLocationTypes(prev => 
      prev.includes(locationType) 
        ? prev.filter(lt => lt !== locationType)
        : [...prev, locationType]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedLocationTypes([]);
    setMinSalary(30000);
    setSearchQuery('');
    setLocationQuery('');
  };

  const activeFiltersCount = selectedCategories.length + selectedTypes.length + selectedLocationTypes.length;

  const categoryCount: Record<string, number> = {
    Medical: 2,
    Legal: 1,
    Ecommerce: 1,
    Finance: 1,
    General: 2,
    Logistics: 1
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div className="w-64 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Category
                </h3>
                <div className="space-y-1">
                  {Object.entries(categoryCount).map(([category, count]) => (
                    <FilterCheckbox
                      key={category}
                      label={category}
                      count={count}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Job Type
                </h3>
                <div className="space-y-1">
                  <FilterCheckbox
                    label="Full-time"
                    count={5}
                    checked={selectedTypes.includes('Full-time')}
                    onChange={() => toggleType('Full-time')}
                  />
                  <FilterCheckbox
                    label="Part-time"
                    count={1}
                    checked={selectedTypes.includes('Part-time')}
                    onChange={() => toggleType('Part-time')}
                  />
                  <FilterCheckbox
                    label="Contract"
                    count={2}
                    checked={selectedTypes.includes('Contract')}
                    onChange={() => toggleType('Contract')}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Location Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  Work Location
                </h3>
                <div className="space-y-1">
                  <FilterCheckbox
                    label="Remote"
                    count={5}
                    checked={selectedLocationTypes.includes('Remote')}
                    onChange={() => toggleLocationType('Remote')}
                  />
                  <FilterCheckbox
                    label="On-site"
                    count={2}
                    checked={selectedLocationTypes.includes('On-site')}
                    onChange={() => toggleLocationType('On-site')}
                  />
                  <FilterCheckbox
                    label="Hybrid"
                    count={1}
                    checked={selectedLocationTypes.includes('Hybrid')}
                    onChange={() => toggleLocationType('Hybrid')}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Salary Range Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Salary Range
                </h3>
                <SalaryRangeSlider value={minSalary} onChange={setMinSalary} />
              </div>

              {/* Job Alert Box */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-blue-600 rounded-lg p-2">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">Get Job Alerts</h4>
                      <p className="text-xs text-gray-600">Never miss a new job posting</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors">
                    Set Up Alert
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Job Listings */}
          <main className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {jobs.length} Jobs Found
                </h2>
                <p className="text-sm text-gray-600">Showing all available positions</p>
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Most Recent</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
                <option>Most Applicants</option>
              </select>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onSave={handleSaveJob} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm">
                1
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                2
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                3
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}