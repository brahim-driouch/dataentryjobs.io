"use client";

import { JobFormData } from '@/types/jobs';

interface ApplicationTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const ApplicationTab: React.FC<ApplicationTabProps> = ({ formData, updateFormData }) => {
  // ✅ Handle nested application object changes
  const handleApplicationChange = (field: string, value: string) => {
    updateFormData({
      application: {
        ...formData.application,
        [field]: value
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleApplicationMethodChange = (method: 'external' | 'email' | 'internal') => {
    updateFormData({ 
      application: {
        ...formData.application,
        method,
        url: method === 'external' ? formData.application?.url || '' : '',
        email: method === 'email' ? formData.application?.email || '' : '',
        instructions: formData.application?.instructions || '' // ✅ Preserve instructions
      }
    });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Application Process
      </h2>

      <div className="space-y-6">
        {/* Application Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How should candidates apply? *
          </label>
          <div className="space-y-3">
            <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="application_method"
                value="external"
                checked={formData.application?.method === 'external'}
                onChange={() => handleApplicationMethodChange('external')}
                className="mt-1 mr-3"
              />
              <div>
                <span className="font-medium text-gray-900">External Website</span>
                <p className="text-sm text-gray-500">Direct candidates to your company's application page or careers portal</p>
              </div>
            </label>

            <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="application_method"
                value="email"
                checked={formData.application?.method === 'email'}
                onChange={() => handleApplicationMethodChange('email')}
                className="mt-1 mr-3"
              />
              <div>
                <span className="font-medium text-gray-900">Email Application</span>
                <p className="text-sm text-gray-500">Candidates will send their resume and cover letter via email</p>
              </div>
            </label>

            <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="application_method"
                value="internal"
                checked={formData.application?.method === 'internal'}
                onChange={() => handleApplicationMethodChange('internal')}
                className="mt-1 mr-3"
              />
              <div>
                <span className="font-medium text-gray-900">Internal System</span>
                <p className="text-sm text-gray-500">Use our built-in application tracking system (coming soon)</p>
              </div>
            </label>
          </div>
        </div>

        {/* External URL */}
        {formData.application?.method === 'external' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application URL *
            </label>
            <input
              type="url"
              name="application_url"
              value={formData.application?.url || ''}
              onChange={(e) => handleApplicationChange('url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://yourcompany.com/careers/apply"
              required
            />
            <p className="text-xs text-gray-600 mt-2">
              💡 Make sure this URL is publicly accessible and leads directly to your application page
            </p>
          </div>
        )}

        {/* Contact Email */}
        {formData.application?.method === 'email' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              name="application_email"
              value={formData.application?.email || ''}
              onChange={(e) => handleApplicationChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="careers@company.com"
              required
            />
            <p className="text-xs text-gray-600 mt-2">
              💡 This email will be displayed to candidates. Make sure you monitor it regularly.
            </p>
          </div>
        )}

        {/* Application Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Instructions (Optional)
          </label>
          <textarea
            name="application_instructions"
            value={formData.application?.instructions || ''}
            onChange={(e) => handleApplicationChange('instructions', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Example: Please include your portfolio, reference code #DEJ2025, or mention salary expectations..."
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.application?.instructions?.length || 0}/1000 characters
          </p>
        </div>

        {/* Job Posting Options */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Publishing Options</h3>
          
          {/* Job Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Save as Draft</option>
              <option value="pending_approval">Submit for Review</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              {formData.status === 'draft' 
                ? "📝 Draft - Your job posting will be saved but not visible to candidates"
                : "✅ Submit for Review - Your job will be reviewed by our team before going live"
              }
            </p>
          </div>

          {/* Expiration Date (Optional) */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Expiration Date (Optional)
            </label>
            <input
              type="date"
              name="expires_date"
              value={formData.expires_date ? new Date(formData.expires_date).toISOString().split('T')[0] : ''}
              onChange={(e) => updateFormData({ expires_date: e.target.value ? new Date(e.target.value) : undefined })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Default: 30 days from publication. Leave empty to use default.
            </p>
          </div>

          {/* Urgent Hiring Flag */}
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="urgent_hiring"
                checked={formData.urgent_hiring || false}
                onChange={(e) => updateFormData({ urgent_hiring: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                🔥 Mark as Urgent Hiring
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Highlight this job as urgent to attract faster applications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationTab;