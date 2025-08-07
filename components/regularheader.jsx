'use client';
import React, { useState } from 'react';
import { Menu, X, Droplets, Facebook, Twitter, Linkedin } from 'lucide-react';

const RegularHeader = () => {
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
    <>
      <nav className="sticky top-0 z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-800 font-bold text-lg">HydraInsight</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Social & Subscribe */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-1 mr-3" role="list" aria-label="Social media links">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                      title={social.name}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
              
              <div className="w-px h-6 bg-gray-300" aria-hidden="true"></div>
              
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                Subscribe
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700"
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
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <nav role="navigation" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors py-3 px-2 font-medium rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              <div className="pt-3 border-t border-gray-200 mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3" role="list" aria-label="Social media links">
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
                        className="text-gray-600 hover:text-blue-600 transition-colors p-1"
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
    </>
  );
};

export default RegularHeader;