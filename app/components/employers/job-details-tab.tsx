import { JobFormData } from "./job-posting-form";

interface JobDetailsTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobDetailsTab: React.FC<JobDetailsTabProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Job Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Data Entry Clerk, Remote Data Specialist"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type *
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="temporary">Temporary</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Location *
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="locationType"
              value="remote"
              checked={formData.locationType === 'remote'}
              onChange={handleChange}
              className="mr-3"
            />
            <span>Fully Remote</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="locationType"
              value="hybrid"
              checked={formData.locationType === 'hybrid'}
              onChange={handleChange}
              className="mr-3"
            />
            <span>Hybrid</span>
          </label>
          
          {formData.locationType === 'hybrid' && (
            <div className="ml-6">
              <input
                type="text"
                name="hybridLocation"
                value={formData.hybridLocation}
                onChange={handleChange}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please specify location/city"
                required
              />
            </div>
          )}
        </div>
      </div>

      <SalarySection formData={formData} updateFormData={updateFormData} />
    </section>
  );
};

const SalarySection: React.FC<JobDetailsTabProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Salary Information
      </label>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="salaryType"
              value="range"
              checked={formData.salaryType === 'range'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Salary Range</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="salaryType"
              value="fixed"
              checked={formData.salaryType === 'fixed'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Fixed Salary</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="salaryType"
              value="hourly"
              checked={formData.salaryType === 'hourly'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Hourly Rate</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="salaryType"
              value="negotiable"
              checked={formData.salaryType === 'negotiable'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Negotiable</span>
          </label>
        </div>

        {formData.salaryType === 'range' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Salary
              </label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Salary
              </label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        )}

        {formData.salaryType === 'fixed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Amount
              </label>
              <input
                type="number"
                name="salaryFixed"
                value={formData.salaryFixed}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        )}

        {formData.salaryType === 'hourly' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate
              </label>
              <input
                type="number"
                name="salaryRate"
                value={formData.salaryRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 25"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsTab;