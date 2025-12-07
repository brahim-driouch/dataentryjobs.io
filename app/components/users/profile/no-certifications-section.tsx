import { BadgeCheck, BadgeCheckIcon, FileText, Plus, Shield, TrendingUp } from "lucide-react";

export const NoCertificationsSection = () => {
  return (
    <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-dashed border-amber-200 p-8 hover:border-amber-300 transition-all duration-300">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
          <FileText className="text-amber-600" size={32} />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Add Certifications
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          Stand out with professional credentials and certifications
        </p>

        {/* Stats/Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <BadgeCheckIcon className="text-amber-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">+60%</p>
            <p className="text-xs text-gray-600">Trust</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Shield className="text-green-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">Verified</p>
            <p className="text-xs text-gray-600">Skills</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <TrendingUp className="text-blue-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">Premium</p>
            <p className="text-xs text-gray-600">Roles</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Certification</span>
        </button>

        {/* Helper Text */}
        <div className="mt-6 bg-white rounded-lg p-3 text-left">
          <p className="text-xs text-gray-500 mb-2">
            <strong className="text-gray-700">💡 Optional but recommended:</strong>
          </p>
          <p className="text-xs text-gray-600">
            Certifications help validate your expertise and can significantly boost your profile visibility
          </p>
        </div>
      </div>
    </div>
  );
};