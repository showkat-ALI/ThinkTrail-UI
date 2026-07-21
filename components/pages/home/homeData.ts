import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Globe,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Course = {
  title: string;
  instructor: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  color: string;
};

export type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
};

export const FEATURES: Feature[] = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description:
      "Learn from industry professionals with real-world experience and proven teaching methodologies.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description:
      "Engage with peers, join study groups, and get feedback from a supportive community.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description:
      "Earn recognized credentials that validate your skills and boost your career prospects.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and personalized milestones.",
  },
  {
    icon: Globe,
    title: "Flexible Schedule",
    description:
      "Learn at your own pace with 24/7 access to materials across all your devices.",
  },
  {
    icon: MessageSquare,
    title: "Direct Mentorship",
    description:
      "Get guidance from instructors through live sessions, forums, and direct messaging.",
  },
];

export const COURSES: Course[] = [
  {
    title: "Advanced Data Science",
    instructor: "Dr. Sarah Johnson",
    category: "Data Science",
    duration: "12 weeks",
    students: 2450,
    rating: 4.9,
    image: "DS",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "UI/UX Design Mastery",
    instructor: "Michael Chen",
    category: "Design",
    duration: "8 weeks",
    students: 1890,
    rating: 4.8,
    image: "UX",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Full-Stack Development",
    instructor: "Alex Rivera",
    category: "Programming",
    duration: "16 weeks",
    students: 3200,
    rating: 4.9,
    image: "FS",
    color: "from-emerald-500 to-teal-500",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Elena Rodriguez",
    role: "Software Engineer at Google",
    content:
      "The courses here are incredibly well-structured. I was able to transition into tech within 6 months.",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "Marcus Chen",
    role: "Product Manager at Spotify",
    content:
      "The mentorship and community support made all the difference. Best investment in my career.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Aria Thompson",
    role: "UX Designer at Airbnb",
    content:
      "Practical projects and expert feedback helped me build a portfolio that got me hired.",
    rating: 5,
    avatar: "AT",
  },
];
