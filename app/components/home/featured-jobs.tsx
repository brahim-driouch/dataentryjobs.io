import { ArrowRight, Clock, DollarSign, MapPin } from "lucide-react";

export const FeaturedJobs = () => {
  const jobs = [
    {
      id: 1,
      title: 'Medical Data Entry Specialist',
      company: 'HealthCare Plus',
      location: 'Remote - Worldwide',
      salary: '$35,000 - $45,000',
      type: 'Full-time',
      featured: true,
      logo: '🏥',
      tags: ['Remote', 'Entry Level', 'Medical']
    },
    {
      id: 2,
      title: 'Legal Document Data Entry',
      company: 'Legal Associates Inc',
      location: 'United States',
      salary: '$40,000 - $50,000',
      type: 'Full-time',
      featured: true,
      logo: '⚖️',
      tags: ['Remote', 'Legal', 'HIPAA']
    },
    {
      id: 3,
      title: 'E-commerce Product Listing',
      company: 'ShopGlobal',
      location: 'Remote - Asia',
      salary: '$25,000 - $35,000',
      type: 'Part-time',
      featured: true,
      logo: '🛒',
      tags: ['Remote', 'Flexible', 'E-commerce']
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Jobs
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked opportunities from verified employers
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            View All Jobs
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{job.logo}</div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              
              <p className="text-gray-700 font-medium mb-4">{job.company}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}/year</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            View All Jobs
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};