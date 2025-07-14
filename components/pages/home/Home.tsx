import Hero from "./hero/Hero";
import Companies from "./copmanies/index";
import "../../../styles/globals.css"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BookOpen, Users, Award, TrendingUp, Play, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <>
     

const Index = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create network nodes
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const nodeCount = 50;

    // Node geometry and material
    const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8
    });

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      nodes.push(node);
      scene.add(node);
    }

    // Create connections between nearby nodes
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 3) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position
          ]);
          const line = new THREE.Line(geometry, connectionMaterial);
          connections.push(line);
          scene.add(line);
        }
      }
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Animate nodes
      nodes.forEach((node, index) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
        
        // Gentle floating motion
        node.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        node.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.001;
      });

      // Update connections
      connections.forEach((line, index) => {
        const nodeA = nodes[Math.floor(index / (nodes.length - 1))];
        const nodeB = nodes[(index % (nodes.length - 1)) + Math.floor(index / (nodes.length - 1)) + 1];
        if (nodeA && nodeB) {
          const positions = line.geometry.attributes.position;
          positions.setXYZ(0, nodeA.position.x, nodeA.position.y, nodeA.position.z);
          positions.setXYZ(1, nodeB.position.x, nodeB.position.y, nodeB.position.z);
          positions.needsUpdate = true;
        }
      });

      // Gentle camera movement
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Engage with dynamic content and multimedia learning experiences"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers and instructors in real-time discussions"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Earn industry-recognized certificates upon course completion"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      content: "This platform transformed my career. The courses are comprehensive and the community is incredibly supportive.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist",
      content: "The interactive labs and real-world projects helped me land my dream job. Highly recommended!",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "UX Designer",
      content: "Amazing learning experience with top-notch instructors and cutting-edge curriculum.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-black/20 border-b border-purple-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              LearnSpace
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="hover:text-purple-400 transition-colors">Courses</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-purple-400">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0">
              Get Started
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in">
              Master New Skills
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Shape Your Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in animation-delay-300">
              Join thousands of learners advancing their careers with our cutting-edge courses
              and expert-led training programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 px-8 py-3 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-gray-400 animate-fade-in animation-delay-900">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>50K+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>200+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose LearnSpace?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              What Our Students Say
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-purple-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-sm bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl p-12 border border-purple-500/30">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join our community of learners and unlock your potential with expert-designed courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 px-8 py-3 text-lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg">
                  View All Courses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-purple-500/20 backdrop-blur-sm bg-black/20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                LearnSpace
              </span>
            </div>
            <p className="text-gray-400">
              © 2024 LearnSpace. Empowering learners worldwide.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
    </>
  );
}
