import { FEATURES } from "./homeData";

const FeaturesSection = () => {
  return (
    <section className="px-6 py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete learning ecosystem designed to help you achieve your
            goals efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
