import { useMemo } from "react";
import { Award, BookOpen, TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
  const stats = useMemo(
    () => [
      { label: "Active Learners", value: "50K+", icon: Users },
      { label: "Expert Courses", value: "200+", icon: BookOpen },
      { label: "Certificates Issued", value: "15K+", icon: Award },
      { label: "Success Rate", value: "94%", icon: TrendingUp },
    ],
    [],
  );

  return (
    <section className="px-6 py-16 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
