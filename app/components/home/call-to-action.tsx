export const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Data Entry Career?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join 50,000+ professionals finding remote opportunities worldwide
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Browse All Jobs
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Post a Job (Employers)
          </button>
        </div>
        <p className="text-blue-200 text-sm mt-6">
          Free for job seekers • No credit card required
        </p>
      </div>
    </section>
  );
};