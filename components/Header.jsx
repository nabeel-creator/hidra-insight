"use client";

import React, { useState } from 'react';
import { Search, Globe, Menu, X, Droplets } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dams', href: '/dams' },
    { name: 'Water Resources', href: '/water-resources' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'Research', href: '/research' },
    { name: 'News', href: '/news' },
    { name: 'About', href: '/about' }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">HidraInsight</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-blue-300 transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 w-64">
            <Search className="w-4 h-4 text-white/70 mr-3" />
            <input
              type="text"
              placeholder="Search dams, resources..."
              className="bg-transparent text-white placeholder-white/70 outline-none flex-1 text-sm"
            />
          </div>

          {/* Language & Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center text-white/90 hover:text-blue-300 transition-colors">
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">EN</span>
            </button>
            <button className="text-white/90 hover:text-blue-300 transition-colors text-sm font-medium">
              Sign In
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/90 backdrop-blur-md">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-white/70 mr-3" />
              <input
                type="text"
                placeholder="Search dams, resources..."
                className="bg-transparent text-white placeholder-white/70 outline-none flex-1 text-sm"
              />
            </div>
            
            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white/90 hover:text-blue-300 transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Auth */}
            <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
              <button className="flex items-center text-white/90 hover:text-blue-300 transition-colors">
                <Globe className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">EN</span>
              </button>
              <button className="text-white/90 hover:text-blue-300 transition-colors text-sm font-medium">
                Sign In
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;