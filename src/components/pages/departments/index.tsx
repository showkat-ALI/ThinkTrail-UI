import React from 'react';
import { Button } from 'flowbite-react';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import  Router  from 'next/router';

// Sample department data
const departments = [
  {
    id: "cs",
    title: "Computer Science",
    description: "Explore the world of algorithms, software development, artificial intelligence, and computer systems in our cutting-edge Computer Science department.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80"
  },
  {
    id: "business",
    title: "Business Administration",
    description: "Develop leadership skills and business acumen with our comprehensive Business Administration program focused on modern management practices.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80"
  },
  {
    id: "engineering",
    title: "Engineering",
    description: "Build the future through innovation in mechanical, electrical, civil, and chemical engineering disciplines with hands-on practical experience.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  },
  {
    id: "medicine",
    title: "Medicine & Health Sciences",
    description: "Prepare for a career in healthcare with our comprehensive medical programs, including hands-on clinical experience and cutting-edge research.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80"
  },
  {
    id: "arts",
    title: "Arts & Humanities",
    description: "Express your creativity and develop critical thinking through our diverse programs in literature, philosophy, history, and the arts.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80"
  },
  {
    id: "science",
    title: "Natural Sciences",
    description: "Discover the workings of the natural world through our programs in physics, chemistry, biology, and environmental science.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
  }
];
const handleAdmission = () => {
  
    Router.push("/dashboard");
};
const DepartmentGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-purple-600">Academic Departments</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Explore our diverse range of departments and find the perfect program to kickstart your academic journey.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {departments.map((dept) => (
          <div key={dept.id} className="h-full">
             <div className="dept-card h-full">
      <div 
        className="dept-card-image h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${dept.image})` }}
      >
        <div className="dept-card-overlay">
          <h3 className="text-white font-bold text-xl mb-1">{dept?.title}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-700 mt-2 mb-4">{dept?.description}</p>
        </div>
        <Button 
          onClick={handleAdmission}
          className="glass-hover bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 text-white"
        >
          Take Admission
          <ArrowRightCircleIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DepartmentGrid