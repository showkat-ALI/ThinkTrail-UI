import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import ThreeBackground from "./ThreeBackground";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import FeaturedCourses from "./FeaturedCourses";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ThreeBackground />

      <div className="relative z-10">
        

        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <FeaturedCourses />
          <TestimonialsSection />
          <CTASection />
        </main>

        
      </div>
    </div>
  );
};

export default HomePage;
