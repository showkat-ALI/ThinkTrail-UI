/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";

const About = () => {            
  return (
    <>
      <Head>
        <title>About | Think Trail</title>
        <meta name="description" content="Learn more about Think Trail and our mission to provide cutting-edge IT education" />
      </Head>
      <HomeLayout>
        {/* Hero Section */}
        <div className="relative min-h-[500px] bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
          
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <h1 className="font-black text-5xl md:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Think Trail
            </h1>
            <p className="font-bold text-2xl md:text-3xl text-emerald-400">
              #Get to know us
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 font-nunito">
          {/* About Section */}
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 sm:p-12 border border-slate-800/50 mb-16">
            <div className="flex items-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mr-4">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                About Us
              </h1>
            </div>
            <div className="text-gray-300 space-y-6">
              <p>
                Think Trail focuses heavily on the Risk Management Framework. 
                The risk management framework creates an effective means to help 
                companies select the required security controls which are deemed 
                necessary to protect the Organization, its team members, as well 
                as all operations and assets of the Organization.
              </p>
              <p>
                The framework is designed to access all the layers of the 
                Organization, understand the goals of each project, and monitor 
                all operating systems to identify and analyze any possible risk 
                management and mitigation strategies.
              </p>
              <p>
                We maintain newbies to become experts in the Federal Information 
                Security Management (FISMA) Risk Management Framework (RMF) process.
              </p>
              <p>
                You will be trained for roles such as IT Security Analyst,
                Security Control Assessor (SCA), Information System Security
                Officer(ISSO), ISSO Support Analyst, and GRC Analyst,
                Third-Party Risk Assessor.
              </p>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Vision */}
            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 sm:p-12 border border-slate-800/50">
              <div className="flex items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mr-4">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                  <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
                </svg>
                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Our Vision
                </h1>
              </div>
              <p className="text-gray-300">
                We are seeking to empower the next generation of tech
                entrepreneurs as a way of overcoming extreme poverty and
                unemployment - while promoting tech knowledge among the least
                privileged. We deliver programs around key tech sectors and
                provide African technology startups with the necessary
                knowledge, tools, and resources they require to go advance in their
                career of propelling their business.
              </p>
            </div>

            {/* Mission */}
            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 sm:p-12 border border-slate-800/50">
              <div className="flex items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mr-4">
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Our Mission
                </h1>
              </div>
              <p className="text-gray-300">
                We believe a thriving workforce starts with equitable access to
                education. Our mission is to advance economic equity through
                rigorous training for tech careers and to connect skilled talent
                to leading business. We're committed to increasing access and
                creating opportunities for individuals who aspire to work in tech
                because the right career changes everything.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Join our revolutionary learning platform and unlock unlimited potential with 
              AI-powered education designed for tomorrow's leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white rounded-lg shadow-lg shadow-emerald-500/25 font-bold transition-all duration-300"
              >
                Explore Programs
              </button>
              <button 
                className="px-8 py-3 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-lg font-bold backdrop-blur-sm transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default About;