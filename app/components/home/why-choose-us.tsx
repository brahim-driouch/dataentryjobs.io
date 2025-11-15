import { DollarSign, Heart, Shield, TrendingUp, Users, Zap } from "lucide-react";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Employers',
      description: 'All companies are screened to ensure legitimate opportunities'
    },
    {
      icon: Zap,
      title: 'Instant Job Alerts',
      description: 'Get notified immediately when matching jobs are posted'
    },
    {
      icon: DollarSign,
      title: 'Transparent Salaries',
      description: 'See salary ranges upfront - no surprises or hidden fees'
    },
    {
      icon: Heart,
      title: 'Free for Job Seekers',
      description: 'Browse, search, and apply to unlimited jobs at no cost'
    },
    {
      icon: TrendingUp,
      title: 'Career Resources',
      description: 'Access guides, tips, and training to boost your skills'
    },
    {
      icon: Users,
      title: 'Global Opportunities',
      description: 'Connect with employers from 50+ countries worldwide'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose DataEntryJobs.io?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to connecting talented professionals with quality opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="shrink-0">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
