import { JobFormData } from "./job-posting-form";

interface JobDescriptionTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobDescriptionTab: React.FC<JobDescriptionTabProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Job Description & Requirements
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the role, team, and overall purpose..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Responsibilities *
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="List the main tasks and responsibilities..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements *
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="List the required skills, experience, and qualifications..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Skills (Nice-to-Have)
          </label>
          <textarea
            name="preferredSkills"
            value={formData.preferredSkills}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="List any additional skills that would be beneficial..."
          />
        </div>
      </div>
    </section>
  );
};

export default JobDescriptionTab;