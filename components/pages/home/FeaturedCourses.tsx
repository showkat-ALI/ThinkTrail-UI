"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { Star } from "lucide-react";
import { COURSES } from "./homeData";

const FeaturedCourses = () => {
  const router = useRouter();

  return (
    <section className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Handpicked courses from top instructors to accelerate your
              learning journey.
            </p>
          </div>
          <Button
            className="hidden sm:flex border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => router.push("/courses")}
          >
            View All Courses
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <div
              key={course.title}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`h-48 bg-gradient-to-br ${course.color} flex items-center justify-center`}
              >
                <span className="text-4xl font-bold text-white/90">
                  {course.image}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full mb-3">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {course.instructor}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {course.duration}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {course.students.toLocaleString()} students
                  </span>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  onClick={() =>
                    router.push(
                      `/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`,
                    )
                  }
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
