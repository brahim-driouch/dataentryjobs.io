"use client";
import { useState } from "react";
import CompanyInfoTab from "./company-info-tab";
import JobDetailsTab from "./job-details-tab";
import JobDescriptionTab from "./job-description-tab";
import ApplicationTab from "./job-application-tab";
import { JobFormData } from "@/types/jobs";
import { useJobPosting } from "@/hooks/jobs/useJobPosting";
import { validateJobRequiredFields } from "@/lib/data-validator";
import { showErrors } from "@/utils/show-errors";
import { useSession } from "next-auth/react";
import { showSuccess } from "@/utils/showSuccess";
import { Spinner } from "../../shared/spinner";
import { useQueryClient } from "@tanstack/react-query";

const JobPostingForm = () => {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState("company");
  const [formData, setFormData] = useState<JobFormData>({
    employerId: session?.user?.id,
    companyId: session?.user?.company?.companyId,
    title: "",
    companyName: "",
    companyLogo: null,
    description: "",
    responsibilities: "",
    requirements: "",
    category: "Other",
    experienceLevel: "Not Specified",
    employmentType: "Full-time",
    locationType: "remote",
    country: "",
    isRemote: true,
    salaryCurrency: "USD",
    salaryPeriod: "month",
    salaryIsDisclosed: false,
    skills: "",
    typingSpeedRequired: false,
    application: {
      method: "internal",
      url: "",
      email: "",
      instructions: "",
    },
    status: "draft",
    hiringForOtherCompany: "no",
  });

  const queryClient = useQueryClient();

  const tabs = [
    { id: "company", label: "Company Info" },
    { id: "details", label: "Job Details" },
    { id: "description", label: "Description" },
    { id: "application", label: "Application" },
  ];

  const updateFormData = (newData: Partial<JobFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };
  const mutation = useJobPosting();

  const saveDraft = () => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        console.log(formData)

    try {
      if (
        !formData.companyName &&
        formData.hiringForOtherCompany === "no"
      ) {
        const company = session?.user?.company;
        if (company) {
          formData.companyName = company.name;
          formData.companyId = company.companyId;
        }
        return;
      }
      if(formData.hiringForOtherCompany === "yes"){
        formData.companyName = formData.otherCompanyName as string;
      }
      const validation = validateJobRequiredFields(formData);
      if (!validation.isValid) {
        const errors = Object.values(validation.errors);
        showErrors(errors, () => {});
        return;
      }
      if (validation.isValid) {
        await mutation.mutateAsync(formData);
        const message =
          formData.status === "draft"
            ? " Job post saved successfully"
            : " Job post submitted for Review";
        showSuccess(message);
        setFormData({
          employerId: session?.user?.id,
          companyId: session?.user?.company?.companyId,
          title: "",
          companyName: "",
          companyLogo: null,
          description: "",
          responsibilities: "",
          requirements: "",
          category: "Other",
          experienceLevel: "Not Specified",
          employmentType: "Full-time",
          locationType: "remote",
          country: "",
          isRemote: true,
          salaryCurrency: "USD",
          salaryPeriod: "month",
          salaryIsDisclosed: false,
          skills: "",
          typingSpeedRequired: false,
          application: {
            method: "internal",
            url: "",
            email: "",
            instructions: "",
          },
          status: "draft",
          hiringForOtherCompany: "no",
        });
        //revalidate react query
        await queryClient.invalidateQueries({ queryKey: ['jobs'],exact: false });
      }
    } catch (error: any | Error) {
      showErrors(
        ["message" in error ? error.message : "Something went wrong"],
        () => {}
      );
      console.log(error);
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Post a Job - dataentryjobs.io
        </h1>
        <p className="text-gray-600">
          Find your next great hire! Your progress is automatically saved as you
          go.
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
        {/* Company Information Tab */}
        {activeTab === "company" && (
          <CompanyInfoTab formData={formData} updateFormData={updateFormData} />
        )}

        {/* Job Details Tab */}
        {activeTab === "details" && (
          <JobDetailsTab formData={formData} updateFormData={updateFormData} />
        )}

        {/* Job Description Tab */}
        {activeTab === "description" && (
          <JobDescriptionTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Application Process Tab */}
        {activeTab === "application" && (
          <ApplicationTab formData={formData} updateFormData={updateFormData} />
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
                disabled={mutation.isPending}
                type="submit"
                className="px-8 py-3 cursor-pointer outline-none bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                {mutation.isPending ? (
                  <>
                    <Spinner /> Posting...
                  </>
                ) : (
                  "Post Job Listing"
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

export default JobPostingForm;
