import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Medical Data Entry Specialist',
      country: 'Philippines',
      avatar: '👩',
      rating: 5,
      text: 'I found my dream remote job in just 2 weeks! The platform made it so easy to filter medical data entry positions.'
    },
    {
      name: 'Raj Kumar',
      role: 'Data Entry Professional',
      country: 'India',
      avatar: '👨',
      rating: 5,
      text: 'Best job board for data entry work. All listings are legitimate and salary information is transparent.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Legal Data Entry Clerk',
      country: 'United States',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Finally, a job board dedicated to data entry! No more sifting through irrelevant postings on general sites.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Job Seekers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who found their dream jobs with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
