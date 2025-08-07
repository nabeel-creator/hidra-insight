'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  MapPin,
  Award,
  Users,
  BookOpen,
  Zap,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Target,
  Lightbulb,
  Globe,
  ArrowDown,
  Quote
} from 'lucide-react';
import haseeb from '@/assats/haseeb.svg';

const AboutSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: '50+', label: 'Major Projects', icon: <Target className="w-6 h-6" /> },
    { number: '15+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
    { number: '100K+', label: 'Readers Reached', icon: <Users className="w-6 h-6" /> },
    { number: '200+', label: 'Articles Written', icon: <BookOpen className="w-6 h-6" /> }
  ];

  const expertise = [
    { title: 'Dam Engineering', desc: 'Designing sustainable water infrastructure', icon: '🏗️' },
    { title: 'Hydropower Systems', desc: 'Clean energy solutions', icon: '⚡' },
    { title: 'Water Management', desc: 'Optimizing resource distribution', icon: '💧' },
    { title: 'Project Leadership', desc: 'Managing complex engineering teams', icon: '👥' },
    { title: 'Research & Development', desc: 'Innovating for the future', icon: '🔬' },
    { title: 'Sustainability', desc: 'Environmental impact assessment', icon: '🌱' }
  ];

  const journey = [
    { year: '2011', title: 'Engineering Graduate', desc: 'Started journey at University of Agriculture' },
    { year: '2013', title: 'MSc. in Water Resourse Engineering', desc: 'MSc. From University of Engineering and Technology' },
    { year: '2015', title: 'Senior Engineer', desc: 'Promoted to lead complex dam projects' },
    { year: '2020', title: 'Blog Launch', desc: 'Started sharing knowledge online' },
    { year: '2023', title: 'Industry Recognition', desc: 'Awarded for sustainable engineering' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-32 left-40 w-4 h-4 bg-purple-300 rounded-full animate-bounce delay-700"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Profile Image with Glow Effect */}
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg scale-110 opacity-75 animate-pulse"></div>
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src={haseeb}
                alt="Enge. Hasseb Ahsan"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
              Enge. Hasseb Ahsan
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-blue-200 font-light mb-4">
            Senior Water Resources Engineer
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Transforming water challenges into sustainable solutions. Building the future of water infrastructure, one innovative project at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 text-white mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Impact by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Numbers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every project tells a story of innovation and dedication
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center transform hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 group-hover:border-blue-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                My Engineering
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Journey</span>
              </h2>

              <div className="prose prose-lg text-gray-700 mb-8">
                
                  <p className="text-xl leading-relaxed mb-6">With a strong foundation in hydrology and hydraulics, I've contributed to numerous projects across Pakistan as an irrigation engineer, hydrologist, and hydraulic designer. My expertise includes:</p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reviewing and updating feasibility reports for water resource projects</li>
                    <li>Frequency analysis and flow duration curve (FDC) development</li>
                    <li>Area-elevation-capacity modeling using ArcGIS</li>
                    <li>Peak runoff estimation using HEC-HMS</li>
                    <li>Reservoir routing and flood hydrograph generation</li>
                    <li>Design of hydraulic structures including regulators</li>
                    <li>Scour depth and energy loss calculations through bridges</li>
                    <li>Backwater and sedimentation analysis using HEC-RAS and Excel</li>
                    <li>Development of capacity, draw-off, and command statements for irrigation systems</li>
                  </ul>

               
                

                <blockquote className="relative bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
                  <Quote className="absolute top-2 left-2 w-6 h-6 text-blue-500 opacity-50" />
                  <p className="italic text-lg text-gray-800 pl-8">
                    "Engineering is not just about building structures; it's about creating a sustainable future for generations to come."
                  </p>
                </blockquote>

                <p className="text-lg leading-relaxed">
                  Through this blog, I share insights from real-world projects, technical innovations, and lessons learned from managing complex infrastructure developments. My goal is to inspire the next generation of engineers and contribute to the advancement of sustainable water resource management.
                </p>
              </div>

              <div className="flex items-center space-x-4 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>Based in Lahore, Punjab, Pakistan</span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-6">What Drives Me</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Lightbulb className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span>Innovative problem-solving approaches</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span>Environmental sustainability focus</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span>Mentoring future engineers</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span>Continuous learning & growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Areas of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Specialized knowledge gained through years of hands-on experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20 hover:border-opacity-30">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Timeline</span>
            </h2>
            <p className="text-xl text-gray-600">Key milestones in my engineering career</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>

            {journey.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-blue-600 font-bold text-lg mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Whether you're looking for engineering insights, collaboration opportunities, or just want to connect with a fellow engineer, I'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              Start a Conversation
            </button>
            <Link href="/blog" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Explore My Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;