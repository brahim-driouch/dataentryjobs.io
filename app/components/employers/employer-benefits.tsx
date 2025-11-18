// components/auth/AuthBenefits.tsx
import { CheckCircle } from 'lucide-react';

const EmployerBenefits = () => {
  const benefits = [
    'Access to 50,000+ data entry professionals',
    'AI-powered candidate matching',
    'Post jobs in 72 hours average hiring time',
    'Manage multiple job postings',
    'Direct messaging with candidates'
  ];

  return (
    <div className="text-white h-full flex flex-col justify-start  items-start ">
      <h2 className="text-3xl font-bold mb-6">
        Hire Top Data Entry Talent Faster
      </h2>
      <p className="text-blue-100 text-lg mb-8">
        Join thousands of employers who trust dataentryjobs.io to find qualified data entry professionals.
      </p>

      <div className="space-y-4 mb-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-yellow-300 shrink-0" />
            <span className="text-blue-100">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="text-2xl font-bold text-white mb-1">95%</div>
          <div className="text-blue-200 text-sm">Fill Rate</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="text-2xl font-bold text-white mb-1">72h</div>
          <div className="text-blue-200 text-sm">Avg. Hire Time</div>
        </div>
      </div>
    </div>
  );
};

export default EmployerBenefits;