"use client";

import { JobFormData } from '@/types/jobs';
import countries from '@/assets/countries.json';

interface JobDetailsTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const EditJobDetailsTab: React.FC<JobDetailsTabProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      updateFormData({ [name]: checked });
    } else if (type === 'number') {
      updateFormData({ [name]: value ? parseFloat(value) : undefined });
    } else {
      updateFormData({ [name]: value });
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Job Details
      </h2>

      <div className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Senior Data Entry Specialist"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Medical">Medical</option>
            <option value="General">General</option>
            <option value="Legal">Legal</option>
            <option value="Ecommerce">Ecommerce</option>
            <option value="Finance">Finance</option>
            <option value="Logistics">Logistics</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory (Optional)
          </label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Medical Transcription"
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment Type *
          </label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Not Specified">Not Specified</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Location Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Location Type *
          </label>
          <select
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="remote">Remote</option>
            <option value="onsite">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* City (required for onsite/hybrid) */}
        {formData.locationType !== 'remote' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., New York"
              required
            />
          </div>
        )}

        {/* State/Province (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province (Optional)
          </label>
          <input
            type="text"
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., California"
          />
        </div>

        {/* Remote Regions (for remote jobs) */}
        {formData.locationType === 'remote' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remote Regions (Optional)
            </label>
            <input
              type="text"
              name="remoteRegions"
              value={formData.remoteRegions || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., North America, Europe (comma-separated)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Specify regions where remote workers can be based (comma-separated)
            </p>
          </div>
        )}

        {/* Timezone (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone (Optional)
          </label>
          <input
            type="text"
            name="timezone"
            value={formData.timezone || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., EST, PST, GMT+8"
          />
        </div>

        {/* Salary Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Salary Information</h3>
          
          <div className="space-y-4">
            {/* Salary Disclosure */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="salaryIsDisclosed"
                  checked={formData.salaryIsDisclosed}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Disclose salary in job posting
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Jobs with disclosed salaries typically get more applications
              </p>
            </div>

            {formData.salaryIsDisclosed && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Salary
                  </label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Salary
                  </label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    name="salaryCurrency"
                    value={formData.salaryCurrency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="PHP">PHP (₱)</option>
                    <option value="PKR">PKR (₨)</option>
                    <option value="BDT">BDT (৳)</option>
                    <option value="NGN">NGN (₦)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Period
                  </label>
                  <select
                    name="salaryPeriod"
                    value={formData.salaryPeriod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="year">Per Year</option>
                    <option value="month">Per Month</option>
                    <option value="hour">Per Hour</option>
                    <option value="project">Per Project</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Typing Speed Requirements */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Requirements</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="typingSpeedRequired"
                  checked={formData.typingSpeedRequired}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Typing speed requirement
                </span>
              </label>
            </div>

            {formData.typingSpeedRequired && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Typing Speed (WPM)
                </label>
                <input
                  type="number"
                  name="typingSpeedMin"
                  value={formData.typingSpeedMin || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 60"
                  min="0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditJobDetailsTab;