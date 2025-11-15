import { ArrowRight, Briefcase, CheckCircle, TrendingUp, Users } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      icon: Users,
      title: 'Create Your Profile',
      description: 'Sign up in 30 seconds and set your job preferences'
    },
    {
      number: '2',
      icon: Briefcase,
      title: 'Browse Opportunities',
      description: 'Search through thousands of verified data entry jobs'
    },
    {
      number: '3',
      icon: CheckCircle,
      title: 'Apply with One Click',
      description: 'Submit your application directly to employers'
    },
    {
      number: '4',
      icon: TrendingUp,
      title: 'Get Hired',
      description: 'Start your new remote data entry career today'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding your perfect data entry job is simple and straightforward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
};