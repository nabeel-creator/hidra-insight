"use client";
import img1 from "@/assats/img1.webp";
import img2 from "@/assats/img2.webp";
import img3 from "@/assats/img3.webp";
import React, { useState, useEffect } from 'react';
import { User, Clock, Droplets, BarChart3, Shield } from 'lucide-react';
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample blog posts about dams and water resources
  const blogPosts = [
    {
      id: 1,
      category: "Dam Engineering",
      title: "Revolutionary Water Management: Modern Dam Technologies",
      description: "Explore cutting-edge innovations in dam construction and water storage systems that are reshaping how we manage our most precious resource.",
      author: "Engr. Haseeb Ahsan",
      date: "28 Jan 2024",
      readTime: "12 mins read",
      icon: <Droplets className="w-5 h-5" />,
      image: img1,
    },
    {
      id: 2,
      category: "Water Resources",
      title: "Sustainable Hydropower: Balancing Energy and Ecology",
      description: "Discover how modern hydroelectric facilities are designed to generate clean energy while preserving aquatic ecosystems and biodiversity.",
      author: "Engr. Haseeb Ahsan",
      date: "25 Jan 2024",
      readTime: "15 mins read",
      icon: <BarChart3 className="w-5 h-5" />,
      image: img2
    },
    {
      id: 3,
      category: "Infrastructure",
      title: "Climate Resilience: Adapting Dams for Extreme Weather",
      description: "Learn about innovative strategies and engineering solutions that make water infrastructure more resilient to climate change impacts.",
      author: "Engr. Haseeb Ahsan",
      date: "22 Jan 2024",
      readTime: "10 mins read",
      icon: <Shield className="w-5 h-5" />,
      image: img3
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [blogPosts.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images with Sliding Effect */}
      <div className="absolute inset-0 z-0">
        {blogPosts.map((post, index) => (
          <div
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">{blogPosts[currentSlide].icon}</span>
              {blogPosts[currentSlide].category}
            </div>

            {/* Main Heading */}
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {blogPosts[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="text-md sm:text-lg text-white/90 mb-8 leading-relaxed max-w-2xl">
              {blogPosts[currentSlide].description}
            </p>

            {/* Author Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/80 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <div className="font-semibold text-white">{blogPosts[currentSlide].author}</div>
                  <div className="text-sm text-white/70">Water Resources Expert</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center space-x-1">
                  <span>{blogPosts[currentSlide].date}</span>
                </span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPosts[currentSlide].readTime}</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
                <span>Read Full Article</span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {blogPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'bg-blue-400 w-8 h-2' 
                : 'bg-white/50 hover:bg-white/70 w-2 h-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-20 right-8 z-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 space-y-2">
          <div className="text-white/70 text-xs uppercase tracking-wide">Quick Stats</div>
          <div className="text-white font-bold text-lg">1,200+</div>
          <div className="text-white/80 text-sm">Water Sites Analyzed</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;