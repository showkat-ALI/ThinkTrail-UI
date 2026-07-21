import { Star } from "lucide-react";
import { TESTIMONIALS } from "./homeData";

const TestimonialsSection = () => {
  return (
    <section className="px-6 py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers
            with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
