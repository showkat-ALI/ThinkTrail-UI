"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import {
  Play,
  Star,
  GraduationCap,
  BarChart3,
  Calendar,
  FileText,
} from "lucide-react";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative px-6 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
              <GraduationCap className="w-4 h-4" />
              <span>Trusted by 50,000+ learners worldwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Build Skills That
              <span className="block text-emerald-600 dark:text-emerald-400">
                Shape Your Future
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Join thousands of professionals advancing their careers with
              expert-led courses, hands-on projects, and personalized learning
              paths.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3.5 text-base font-semibold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all duration-200"
                onClick={() => router.push("/courses")}
              >
                <Play className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
              <Button
                size="lg"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3.5 text-base font-semibold"
                onClick={() => router.push("/about")}
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {["ER", "MC", "AT", "JD"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-gray-900"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  Rated 4.9/5 from 12,000+ reviews
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform -rotate-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        In Progress
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Advanced Data Science
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Progress
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        68%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[68%] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Next Session
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Tomorrow, 2:00 PM
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Assignments
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        3 Pending
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
