"use client";
import { Users, Zap, Award, Globe, ArrowRight, LogIn } from 'lucide-react';

const EmployerSection = () => {
  // Value propositions tailored for employers looking for Data Entry specialists
  const features = [
    { 
      icon: Users, 
      title: 'Global Remote Talent Pool', 
      description: 'Access a specialized, pre-filtered pool of 50,000+ data entry professionals worldwide.' 
    },
    { 
      icon: Award, 
      title: 'Quality-Vetted Candidates', 
      description: 'Find candidates pre-screened for accuracy, speed, and remote work readiness in niche areas like Legal and Medical Data Entry.' 
    },
    { 
      icon: Zap, 
      title: 'Fast & Simple Posting', 
      description: 'Our intuitive platform allows you to post a job in minutes and connect with qualified applicants within 24 hours.' 
    },
    { 
      icon: Globe, 
      title: 'Focused Data Entry Niche', 
      description: 'Eliminate general job board noise. Our platform is exclusively dedicated to data entry and related administrative roles.' 
    },
  ];

  const handlePostJob = () => {
    console.log('Redirecting to Create Account / Post Job page');
    // Implement actual routing logic here
  };

  const handleLogin = () => {
    console.log('Redirecting to Employer Login page');
    // Implement actual routing logic here
  };

  return (
    // Use a light background for contrast, keeping the overall theme
    <div className="w-full bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Value Proposition Intro */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Hire the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">Remote Data Entry Specialists</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with pre-vetted, specialized global talent efficiently and cost-effectively.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] border-t-4 border-orange-500"
              >
                <Icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA / Account Section */}
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12 border border-blue-200">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
            Ready to Find Your Next Star?
          </h3>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Create an account to post your first job for free, or log in to manage your current listings.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Primary CTA: Create Account / Post a Job */}
            <button
              onClick={handlePostJob}
              className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Post a Job & Create Account <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            {/* Secondary CTA: Login */}
            <button
              onClick={handleLogin}
              className="flex items-center justify-center bg-transparent text-blue-600 font-semibold px-8 py-4 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              <LogIn className="w-5 h-5 mr-2" /> Employer Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployerSection;