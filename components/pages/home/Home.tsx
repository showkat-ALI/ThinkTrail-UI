
"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BookOpen, Users, Award, TrendingUp, Play, Star, CheckCircle, Menu, X } from 'lucide-react';
import { Button } from 'flowbite-react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';

export default function Index() {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    // Only run this effect on client side
    if (typeof window === 'undefined') return;
    
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create network nodes
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const nodeCount = 120;

    // Node geometry and material
    const nodeGeometry = new THREE.SphereGeometry(0.04, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x06ffa5,
      transparent: true,
      opacity: 0.9
    });

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      node.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20
      );
      nodes.push(node);
      scene.add(node);
    }

    // Create connections
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 5) {
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

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Animate nodes
      nodes.forEach((node, index) => {
        node.rotation.x += 0.003;
        node.rotation.y += 0.003;
        
        node.position.y += Math.sin(Date.now() * 0.0005 + index * 0.01) * 0.008;
        node.position.x += Math.cos(Date.now() * 0.0003 + index * 0.01) * 0.005;
        
        const pulse = Math.sin(Date.now() * 0.001 + index * 0.1) * 0.2 + 0.8;
        (node.material as THREE.MeshBasicMaterial).opacity = pulse;
      });

      // Update connections
      connections.forEach((connection, index) => {
        if (index < nodes.length - 1) {
          const nodeA = nodes[index];
          const nodeB = nodes[index + 1];
          if (nodeA && nodeB) {
            const positions = connection.geometry.attributes.position;
            positions.setXYZ(0, nodeA.position.x, nodeA.position.y, nodeA.position.z);
            positions.setXYZ(1, nodeB.position.x, nodeB.position.y, nodeB.position.z);
            positions.needsUpdate = true;
          }
        }
      });

      // Camera movement
      camera.position.x = Math.sin(Date.now() * 0.0001) * 5;
      camera.position.y = Math.cos(Date.now() * 0.00008) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of all resources
      nodes.forEach(node => {
        scene.remove(node);
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      
      connections.forEach(connection => {
        scene.remove(connection);
        connection.geometry.dispose();
        (connection.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "AI-Powered Learning",
      description: "Personalized learning paths that adapt to your pace and style with cutting-edge AI technology"
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with learners and experts worldwide in our vibrant learning ecosystem"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Earn blockchain-verified certificates recognized by leading global companies"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track your progress with advanced analytics and predictive learning insights"
    }
  ];

  const testimonials = [
    {
      name: "Elena Rodriguez",
      role: "Senior Software Engineer at Google",
      content: "This platform revolutionized my approach to learning. The AI-driven personalization helped me master complex concepts 3x faster than traditional methods.",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "Marcus Chen",
      role: "VP of Data Science at Tesla",
      content: "The hands-on projects and real-world applications prepared me perfectly for my current role. The community support is unmatched.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Aria Thompson",
      role: "Lead UX Designer at Apple",
      content: "Outstanding platform that combines cutting-edge technology with exceptional user experience. It's like having a personal mentor.",
      rating: 5,
      avatar: "AT"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 z-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(6, 255, 165, 0.03) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)' 
        }}
      />
      
      {/* Gradient Overlays for Modern Look */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      <div className="fixed inset-0 z-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Modern Navigation */}
        {/* <Header/> */}
       

        {/* Hero Section */}
        <section className="px-8 py-24 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-500/30 text-emerald-400 font-medium text-sm mb-8">
                🚀 Welcome to the Future of Learning
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9]">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent block mb-4">
                Learn Without
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Limits
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of education with AI-powered personalization, 
              immersive learning experiences, and a global community of innovators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white border-0 px-12 py-4 text-xl font-bold shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Your Journey
              </Button>
              <Button 
                size="lg"
                className="border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 px-12 py-4 text-xl font-bold backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-slate-800/50">
                <div className="flex items-center justify-center space-x-3 text-emerald-400">
                  <Users className="w-8 h-8" />
                  <span className="text-3xl font-black">2M+</span>
                </div>
                <p className="text-gray-400 mt-2 font-medium">Global Learners</p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-slate-800/50">
                <div className="flex items-center justify-center space-x-3 text-blue-400">
                  <BookOpen className="w-8 h-8" />
                  <span className="text-3xl font-black">10K+</span>
                </div>
                <p className="text-gray-400 mt-2 font-medium">Expert Courses</p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-slate-800/50">
                <div className="flex items-center justify-center space-x-3 text-purple-400">
                  <Award className="w-8 h-8" />
                  <span className="text-3xl font-black">99.2%</span>
                </div>
                <p className="text-gray-400 mt-2 font-medium">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Why We&#39;re Different
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Discover the revolutionary features that make LearnSpace the most advanced learning platform on Earth
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-slate-800/50 hover:border-emerald-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-emerald-500/20">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of professionals who transformed their careers with LearnSpace
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-slate-800/50 hover:border-emerald-500/20 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">{testimonial.name}</p>
                      <p className="text-emerald-400 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="backdrop-blur-sm bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl p-16 border border-emerald-500/20 shadow-2xl">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">
                Ready to Transform
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Your Future?
                </span>
              </h2>
              <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join our revolutionary learning platform and unlock unlimited potential with 
                AI-powered education designed for tomorrow&#39;s leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white border-0 px-12 py-4 text-xl font-bold shadow-xl shadow-emerald-500/25"
                >
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Start Free Trial
                </Button>
                <Button 
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-4 text-xl font-bold backdrop-blur-sm"
                >
                  Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* <Footer/> */}
        
      </div>
    </div>
  );
}