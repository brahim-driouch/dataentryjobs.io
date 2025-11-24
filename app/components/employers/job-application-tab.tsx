import { JobFormData } from "./job-posting-form";

interface ApplicationTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const ApplicationTab: React.FC<ApplicationTabProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Application Process
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email for Applications *
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="hr@company.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Link (Optional)
          </label>
          <input
            type="url"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://company.com/apply"
          />
        </div>
      </div>
    </section>
  );
};

export default ApplicationTab;