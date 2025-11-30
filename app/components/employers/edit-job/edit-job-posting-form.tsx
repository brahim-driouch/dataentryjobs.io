"use client";
import { useEffect, useState } from "react";
import { JobFormData, IJob } from "@/types/jobs";
import { validateJobRequiredFields } from "@/lib/data-validator";
import { showErrors } from "@/utils/show-errors";
import { useSession } from "next-auth/react";
import { showSuccess } from "@/utils/showSuccess";
import { Spinner } from "../../shared/spinner";
import { useQueryClient } from "@tanstack/react-query";
import EditCompanyInfoTab from "./edit-company-info-tab";
import EditJobDetailsTab from "./edit-job-details-tab";
import EditJobDescriptionTab from "./edit-job-description-tab";
import EditJobApplicationTab from "./edit-job-application-tab";
import { useJob } from "@/hooks/jobs/useJob";
import { useParams, useRouter } from "next/navigation";
import { useJobUpdate } from "@/hooks/jobs/useUpdateJob";

// Helper function to transform IJob to JobFormData
const transformJobToFormData = (job: IJob): JobFormData => {
  return {
    _id: job._id as string,
    employerId: job.employer_id.toString(),
    companyId: job.company_id?.toString(),
    title: job.title,
    companyName: job.company_name,
    companyLogo: null, // Handle file upload separately
    description: job.description,
    responsibilities: job.responsibilities.join('\n'),
    requirements: job.requirements.join('\n'),
    category: job.category,
    experienceLevel: job.experience_level,
    employmentType: job.employment_type,
    locationType: job.location.type,
    country: job.location.country,
    countryCode: job.location.country_code,
    city: job.location.city,
    state: job.location.state,
    timezone: job.location.timezone,
    isRemote: job.location.is_remote,
    remoteRegions: job.location.remote_regions?.join(', '),
    salaryMin: job.salary.min,
    salaryMax: job.salary.max,
    salaryCurrency: job.salary.currency,
    salaryPeriod: job.salary.period,
    salaryIsDisclosed: job.salary.is_disclosed,
    skills: job.skills.join(', '),
    certifications: job.certifications?.join(', '),
    typingSpeedMin: job.typing_speed?.min,
    typingSpeedRequired: job.typing_speed?.required || false,
    languageRequirements: job.language_requirements?.join(', '),
    application: job.application,
    status: job.status,
    expiresDate: job.expires_date ? new Date(job.expires_date) : undefined,
    hiringForOtherCompany: job.hiring_for_other_company,
    otherCompanyName: job.other_company_name,
    otherCompanyDescription: job.other_company_description,
    otherCompanyLogo: null,
    otherCompanyWebsite: job.other_company_website,
    urgentHiring: job.urgent_hiring,
    isVerified: job.is_verified,
    isRemoteFriendly: job.is_remote_friendly,
    isEntryLevelFriendly: job.is_entry_level_friendly
  };
};

const EditJobPostingForm = () => {
  const { data: session } = useSession();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const id = params.id;
  
  // ✅ Call hooks at component level
  const { data: job, isLoading, error } = useJob(id);

  const [activeTab, setActiveTab] = useState("company");
  const [formData, setFormData] = useState<JobFormData | null>(null);

  const tabs = [
    { id: "company", label: "Company Info" },
    { id: "details", label: "Job Details" },
    { id: "description", label: "Description" },
    { id: "application", label: "Application" },
  ];
  const mutation = useJobUpdate()
  // ✅ Transform job data when loaded
  useEffect(() => {
    if (job) {
      setFormData(transformJobToFormData(job));
    }
  }, [job]);

  const updateFormData = (newData: Partial<JobFormData>) => {
    setFormData((prev) => (prev ? { ...prev, ...newData } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData) return;

    try {
      // Handle company name
      if (!formData.companyName && formData.hiringForOtherCompany === "no") {
        const company = session?.user?.company;
        if (company) {
          formData.companyName = company.name;
          formData.companyId = company.companyId;
        } else {
          showErrors(["Company name is required"], () => {});
          return;
        }
      }
      
      if (formData.hiringForOtherCompany === "yes") {
        formData.companyName = formData.otherCompanyName as string;
      }

      // Validate
      const validation = validateJobRequiredFields(formData);
      if (!validation.isValid) {
        const errors = Object.values(validation.errors);
        showErrors(errors, () => {});
        return;
      }

      // Update job
      await mutation.mutateAsync(formData)
      
      const message = formData.status === "draft"
        ? "Job post updated successfully"
        : "Job post updated and submitted for review";
      
      showSuccess(message);
      
      // Invalidate queries
      await queryClient.invalidateQueries({ queryKey: ['jobs'] });
      await queryClient.invalidateQueries({ queryKey: ['job', id] });
      
      // Redirect back to job detail
      router.push(`/in/employers/jobs/${id}`);
      
    } catch (error: any) {
      showErrors(
        [error?.message || "Something went wrong"],
        () => {}
      );
      console.error(error);
    }
  };

  const nextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const prevTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const goToTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  // ✅ Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
        <span className="ml-2">Loading job data...</span>
      </div>
    );
  }

  // ✅ Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error.message}</p>
          <button
            onClick={() => router.push('/employer/jobs')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // ✅ Handle no data state
  if (!job || !formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <button
            onClick={() => router.push('/employer/jobs')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Edit Job Post - dataentryjobs.io
        </h1>
        <p className="text-gray-600">
          Update your job posting details
        </p>
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
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === "company" && (
          <EditCompanyInfoTab formData={formData} updateFormData={updateFormData} />
        )}

        {activeTab === "details" && (
          <EditJobDetailsTab formData={formData} updateFormData={updateFormData} />
        )}

        {activeTab === "description" && (
          <EditJobDescriptionTab formData={formData} updateFormData={updateFormData} />
        )}

        {activeTab === "application" && (
          <EditJobApplicationTab formData={formData} updateFormData={updateFormData} />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={prevTab}
            disabled={activeTab === "company"}
            className={`px-6 py-3 font-semibold rounded-lg transition duration-200 ${
              activeTab === "company"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>

          {activeTab === "application" ? (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.push(`/employer/jobs/${id}`)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                disabled={mutation.isPending}
                type="submit"
                className="px-8 py-3 cursor-pointer outline-none bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Spinner /> Updating...
                  </>
                ) : (
                  "Update Job"
                )}
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

export default EditJobPostingForm;