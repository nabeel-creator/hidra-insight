"use client";

import React from 'react';
import { Mail, Phone, Globe, Droplets } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          HidraInsight
        </h3>

        {/* Tagline */}
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Leading authority in dam engineering and water resource management with innovative solutions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Get in touch
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-200 transition-colors">
            Schedule a call
          </button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:contact@hidrainsight.com" className="hover:text-blue-600 transition-colors">
              contact@hidrainsight.com
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">
              +1 (234) 567-8900
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <a href="https://hidrainsight.com" className="hover:text-blue-600 transition-colors">
              hidrainsight.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;