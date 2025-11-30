"use client";

import { JobFormData } from '@/types/jobs';
import { useState } from 'react';

interface CompanyInfoTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const EditCompanyInfoTab: React.FC<CompanyInfoTabProps> = ({ formData, updateFormData }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleOtherCompanyChange = (value: 'yes' | 'no') => {
    updateFormData({ hiringForOtherCompany: value });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Company Information
      </h2>

      <div className="space-y-6">
        {/* Hiring for Other Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Are you hiring for another company? *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="hiringForOtherCompany"
                value="no"
                checked={formData.hiringForOtherCompany === 'no'}
                onChange={(e) => handleOtherCompanyChange(e.target.value as 'yes' | 'no')}
                className="mr-2"
              />
              No, hiring for my company
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hiringForOtherCompany"
                value="yes"
                checked={formData.hiringForOtherCompany === 'yes'}
                onChange={(e) => handleOtherCompanyChange(e.target.value as 'yes' | 'no')}
                className="mr-2"
              />
              Yes, hiring for another company
            </label>
          </div>
        </div>

        {/* Company Name - Always use company_name */}
        {formData.hiringForOtherCompany === "yes" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Company Name *
              </label>
              <input
                type="text"
                name="otherCompanyName"
                value={formData.otherCompanyName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter client company name"
                required
              />
            </div>

            {/* Company Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Website
              </label>
              <input
                type="url"
                name="otherCompanyWebsite"
                value={formData.otherCompanyWebsite || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            {/* Company Description */}
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
                placeholder="Describe the company, mission, and culture..."
                required
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EditCompanyInfoTab;