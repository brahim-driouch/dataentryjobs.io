import { Briefcase, Building2, DollarSign, Scale, ShoppingCart, Stethoscope, ArrowRight, TrendingUp } from "lucide-react";

export const JobCategories = () => {
  const categories = [
    {
      icon: Stethoscope,
      title: 'Medical Data Entry',
      count: '1,247',
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      borderColor: 'border-red-100',
      hoverBorder: 'hover:border-red-300',
      textColor: 'text-red-600',
      description: 'Healthcare records, patient data, medical coding',
      trending: true
    },
    {
      icon: Scale,
      title: 'Legal Data Entry',
      count: '523',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      hoverBorder: 'hover:border-blue-300',
      textColor: 'text-blue-600',
      description: 'Legal documents, case files, court records',
      trending: false
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Data Entry',
      count: '891',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
      hoverBorder: 'hover:border-purple-300',
      textColor: 'text-purple-600',
      description: 'Product listings, inventory, catalog management',
      trending: true
    },
    {
      icon: DollarSign,
      title: 'Finance Data Entry',
      count: '645',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-100',
      hoverBorder: 'hover:border-green-300',
      textColor: 'text-green-600',
      description: 'Invoices, accounts, financial records',
      trending: false
    },
    {
      icon: Building2,
      title: 'General Data Entry',
      count: '2,103',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      borderColor: 'border-orange-100',
      hoverBorder: 'hover:border-orange-300',
      textColor: 'text-orange-600',
      description: 'Administrative, CRM, database management',
      trending: false
    },
    {
      icon: Briefcase,
      title: 'Remote Data Entry',
      count: '3,856',
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      hoverBorder: 'hover:border-indigo-300',
      textColor: 'text-indigo-600',
      description: 'Work from anywhere opportunities',
      trending: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Explore by Specialty</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse Jobs by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find specialized data entry opportunities that match your skills and interests
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 border-2 ${category.borderColor} ${category.hoverBorder} hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending</span>
                  </div>
                )}

                {/* Background Decoration */}
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${category.lightColor} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative ${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {category.count}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        jobs available
                      </div>
                    </div>
                    <div className={`${category.lightColor} ${category.textColor} w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <span>View All Categories</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};