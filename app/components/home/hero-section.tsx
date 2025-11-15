
"use client";

import { Search, MapPin, Briefcase, TrendingUp, Globe, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in', location);
    // Add search logic here
  };

  const popularSearches = [
    'Medical Data Entry',
    'Remote Data Entry',
    'E-commerce Data Entry',
    'Legal Data Entry'
  ];

  const stats = [
    { icon: Briefcase, value: '5,000+', label: 'Active Jobs' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: TrendingUp, value: '95%', label: 'Remote Jobs' }
  ];

  return (
    <div className="w-full relative bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            <span>Trusted by 50,000+ Job Seekers Worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mt-2">
              Data Entry Job
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Connect with global opportunities in medical, legal, e-commerce, and general data entry. 
            Work remotely from anywhere in the world.
          </p>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
              {/* Job Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Country or city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Search Jobs
              </button>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-blue-200 text-sm">Popular:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  <Icon className="w-8 h-8 text-yellow-300 mb-3 mx-auto" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-80">
          <div className="text-white/60 text-sm">Trusted by companies from:</div>
          {['USA', 'India', 'Philippines', 'UK', 'Canada'].map((country, index) => (
            <div key={index} className="text-white font-semibold bg-white/10 px-4 py-2 rounded-lg">
              {country}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;