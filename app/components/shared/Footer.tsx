"use client"; 
import { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Send,
  CheckCircle,
  Briefcase,
  Heart
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const footerLinks = {
    'Job Seekers': [
      { label: 'Browse Jobs', href: '/jobs' },
      { label: 'Medical Data Entry', href: '/jobs/medical' },
      { label: 'Remote Jobs', href: '/jobs/remote' },
      { label: 'Legal Data Entry', href: '/jobs/legal' },
      { label: 'E-commerce Jobs', href: '/jobs/ecommerce' },
      { label: 'Career Resources', href: '/resources' },
      { label: 'Salary Guide', href: '/salary-guide' }
    ],
    'Employers': [
      { label: 'Post a Job', href: '/post-job' },
      { label: 'Pricing Plans', href: '/pricing' },
      { label: 'Browse Candidates', href: '/candidates' },
      { label: 'Employer Dashboard', href: '/employer/dashboard' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Recruitment Tips', href: '/recruitment-tips' }
    ],
    'Company': [
      { label: 'About Us', href: '/about' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' }
    ],
    'Support': [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Safety Tips', href: '/safety' },
      { label: 'Report a Job', href: '/report' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const countries = [
    'United States', 'India', 'Philippines', 'United Kingdom', 'Canada',
    'Australia', 'Pakistan', 'Bangladesh', 'Nigeria', 'Kenya'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Never Miss a Job Opportunity
              </h3>
              <p className="text-blue-100 text-lg">
                Get personalized job alerts delivered to your inbox daily
              </p>
            </div>
            <div className="w-full md:w-auto md:min-w-[400px]">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={subscribed}
                  className={`${
                    subscribed 
                      ? 'bg-green-500' 
                      : 'bg-white hover:bg-gray-100'
                  } text-gray-900 font-semibold px-6 py-4 rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap`}
                >
                  {subscribed ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-3 text-center md:text-left">
                Join 50,000+ job seekers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">DataEntryJobs.io</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The world's leading job board dedicated exclusively to data entry opportunities. 
                Connecting talented professionals with quality employers worldwide since 2024.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <a href="mailto:support@dataentryjobs.io" className="hover:text-white transition-colors">
                    support@dataentryjobs.io
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <a href="tel:+1234567890" className="hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>Global Remote Company</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`bg-gray-800 ${social.color} w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-bold text-lg mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-200"></span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Popular Countries */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <h4 className="text-white font-semibold mb-4">Popular Countries</h4>
            <div className="flex flex-wrap gap-3">
              {countries.map((country, index) => (
                <a
                  key={index}
                  href={`/jobs/${country.toLowerCase().replace(' ', '-')}`}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                >
                  {country}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 DataEntryJobs.io. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for job seekers worldwide
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;