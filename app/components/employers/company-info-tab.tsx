"use client";
import { useSession } from "next-auth/react";
import { JobFormData } from "./job-posting-form";
import { useEffect } from "react";

interface CompanyInfoTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const CompanyInfoTab: React.FC<CompanyInfoTabProps> = ({ formData, updateFormData }) => {
  const { data: session } = useSession();
  const company = session?.user?.company;

  // Set default to "no" if not already set
  useEffect(() => {
    if (!formData.hiringForOtherCompany) {
      updateFormData({
        hiringForOtherCompany: 'no'
      });
    }
  }, [formData.hiringForOtherCompany, updateFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio') {
      updateFormData({ 
        [name]: value,
        // Clear other company fields if switching back to own company
        ...(value === 'no' && { 
          otherCompanyName: '',
          otherCompanyDescription: '',
          companyWebsite: '',
          companyLogo: null
        })
      });
    } else {
      updateFormData({ [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormData({ companyLogo: file });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        1. Company Information
      </h2>

      {/* Hiring on behalf of another company */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Are you hiring on behalf of another company? *
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="hiringForOtherCompany"
              value="no"
              checked={formData.hiringForOtherCompany === 'no'}
              onChange={handleChange}
              className="mr-3"
              required
            />
            <span>No, I'm hiring for my own company</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="hiringForOtherCompany"
              value="yes"
              checked={formData.hiringForOtherCompany === 'yes'}
              onChange={handleChange}
              className="mr-3"
            />
            <span>Yes, I'm hiring on behalf of another company</span>
          </label>
        </div>
      </div>

      {/* Only show company details when hiring for someone else */}
      {formData.hiringForOtherCompany === 'yes' && (
        <div className="space-y-6 border-t pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Company You're Hiring For
            </h3>
            <p className="text-blue-700 text-sm">
              Please provide the details of the company you're representing.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="otherCompanyName"
              value={formData.otherCompanyName || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the company name you're hiring for"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Website
            </label>
            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://company-website.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                name="companyLogo"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <span className="text-sm text-gray-500">PNG, JPG (200x200px)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description *
            </label>
            <textarea
              name="otherCompanyDescription"
              value={formData.otherCompanyDescription || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the company you're hiring for, including what they do, their mission, and company culture..."
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              This helps candidates understand the company they'll be working with.
            </p>
          </div>
        </div>
      )}

      {/* Show confirmation message when hiring for own company */}
      {formData.hiringForOtherCompany === 'no' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Using Your Company Information
          </h3>
          <p className="text-green-700">
            The job posting will be associated with your company: <strong>{company?.name || 'Your Company'}</strong>
          </p>
          <p className="text-green-600 text-sm mt-2">
            Candidates will see your company name and details from your employer profile.
          </p>
        </div>
      )}
    </section>
  );
};

export default CompanyInfoTab;