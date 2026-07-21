"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { CheckCircle } from "lucide-react";

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-3xl p-12 md:p-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our community of learners and get access to expert-led courses,
            personalized learning paths, and career support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 border-0 px-8 py-3.5 text-base font-bold shadow-lg"
              onClick={() => router.push("/registration")}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <Button
              size="lg"
              className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-3.5 text-base font-semibold"
              onClick={() => router.push("/courses")}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
