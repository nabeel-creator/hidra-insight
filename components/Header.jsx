"use client";

import React, { useState } from 'react';
import { Menu, X, Droplets, Facebook, Twitter, Instagram, Linkedin, Youtube, Link } from 'lucide-react';

const HeroHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Research', href: '/research' },
    { name: 'News', href: '/news' },
    { name: 'About', href: '/about' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'linkdin', href: '#', icon: Linkedin },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">HydraInsight</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-blue-300 transition-colors duration-200 font-medium text-sm relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Social & Subscribe */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-white/80 hover:text-blue-300 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
                    title={social.name}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            
            <div className="w-px h-6 bg-white/30" aria-hidden="true"></div>
            
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md">
          <div className="px-4 py-6 space-y-4">
            <nav role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white/90 hover:text-blue-300 transition-colors py-3 font-medium border-b border-white/10 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4" role="list" aria-label="Social media links">
                  {[
                    { icon: Facebook, name: 'Facebook' },
                    { icon: Twitter, name: 'Twitter' },
                    { icon: Instagram, name: 'Instagram' },
                    { icon: Linkedin, name: 'LinkedIn' },
                    { icon: Youtube, name: 'YouTube' }
                  ].map(({ icon: Icon, name }) => (
                    <a
                      key={name}
                      href="#"
                      className="text-white/80 hover:text-blue-300 transition-colors"
                      aria-label={`Follow us on ${name}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default HeroHeader;