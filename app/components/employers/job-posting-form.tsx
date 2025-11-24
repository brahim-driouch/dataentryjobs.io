"use client";
import { useState, useEffect } from 'react';
import CompanyInfoTab from './company-info-tab';
import JobDetailsTab from './job-details-tab';
import JobDescriptionTab from './job-description-tab';
import ApplicationTab from './job-application-tab';

export interface JobFormData {
  // Company Information
  companyName: string;
  companyWebsite: string;
  companyLogo: File | null;
  companyDescription: string;
  
   hiringForOtherCompany: 'yes' | 'no';
  otherCompanyName: string;
  otherCompanyDescription: string;
  otherCompanyLogo: File | null;
  // Job Details
  jobTitle: string;
  jobType: string;
  locationType: string;
  hybridLocation: string;
  salaryType: string;
  salaryMin: string;
  salaryMax: string;
  salaryFixed: string;
  salaryRate: string;
  currency: string;
  
  // Job Description
  jobDescription: string;
  responsibilities: string;
  requirements: string;
  preferredSkills: string;
  
  // Application Process
  contactEmail: string;
  applicationLink: string;
}

const JobPostingForm = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [formData, setFormData] = useState<JobFormData>({
  hiringForOtherCompany: 'no',  // Changed from 'yes' to 'no' to match your error message
  otherCompanyName: "",
  otherCompanyDescription: "",
  otherCompanyLogo: null,  // Add this line
  companyName: '',
  companyWebsite: '',
  companyLogo: null,
  companyDescription: '',
  jobTitle: '',
  jobType: '',
  locationType: 'remote',
  hybridLocation: '',
  salaryType: 'range',
  salaryMin: '',
  salaryMax: '',
  salaryFixed: '',
  salaryRate: '',
  currency: 'USD',
  jobDescription: '',
  responsibilities: '',
  requirements: '',
  preferredSkills: '',
  contactEmail: '',
  applicationLink: '',
});


  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const tabs = [
    { id: 'company', label: 'Company Info' },
    { id: 'details', label: 'Job Details' },
    { id: 'description', label: 'Description' },
    { id: 'application', label: 'Application' },
  ];

  // Load draft on component mount
  useEffect(() => {
    loadDraft();
  }, []);

  const updateFormData = (newData: Partial<JobFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const saveDraft = () => {
    try {
      localStorage.setItem('jobPostingDraft', JSON.stringify({
        ...formData,
        // Convert File to string for storage (in real app, you'd upload to server)
        companyLogo: formData.companyLogo ? 'saved' : null
      }));
      setLastSaved(new Date());
      console.log('Draft auto-saved:', formData);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  const loadDraft = () => {
    try {
      const draft = localStorage.getItem('jobPostingDraft');
      if (draft) {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
        setLastSaved(new Date());
        console.log('Draft loaded:', parsedDraft);
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('jobPostingDraft');
    setLastSaved(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    clearDraft(); // Clear draft after successful submission
    // Handle form submission logic here
  };

  const nextTab = () => {
    saveDraft(); // Auto-save when moving to next tab
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const prevTab = () => {
    saveDraft(); // Auto-save when going back
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const goToTab = (tabId: string) => {
    saveDraft(); // Auto-save when switching tabs directly
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Post a Job - dataentryjobs.io
        </h1>
        <p className="text-gray-600">
          Find your next great hire! Your progress is automatically saved as you go.
        </p>
        
        {/* Auto-save status indicator */}
        {lastSaved && (
          <div className="mt-3 text-sm text-green-600">
            ✓ Draft auto-saved {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => goToTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Company Information Tab */}
        {activeTab === 'company' && (
          <CompanyInfoTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Job Details Tab */}
        {activeTab === 'details' && (
          <JobDetailsTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Job Description Tab */}
        {activeTab === 'description' && (
          <JobDescriptionTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Application Process Tab */}
        {activeTab === 'application' && (
          <ApplicationTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={prevTab}
            disabled={activeTab === 'company'}
            className={`px-6 py-3 font-semibold rounded-lg transition duration-200 ${
              activeTab === 'company'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>

          {/* Optional: Keep a small "Save Draft" button for power users */}
          <button
            type="button"
            onClick={saveDraft}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Save Draft Now
          </button>

          {activeTab === 'application' ? (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={clearDraft}
                className="px-6 py-3 text-gray-600 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Clear Draft
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Post Job Listing
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={nextTab}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;