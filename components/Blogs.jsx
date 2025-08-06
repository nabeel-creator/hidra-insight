"use client";
import { allBlogs } from '@/assats/assats.jsx';
import React, { useState } from 'react';
import { Clock, User, Filter, Search, Droplets, Zap, Shield, BarChart3, Settings, Waves, Wrench, Globe } from 'lucide-react';

const AllBlogsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: 'All', icon: <Globe className="w-4 h-4" />, count: 24 },
    { name: 'Dam Safety', icon: <Shield className="w-4 h-4" />, count: 8 },
    { name: 'Hydropower', icon: <Zap className="w-4 h-4" />, count: 6 },
    { name: 'Technology', icon: <Settings className="w-4 h-4" />, count: 5 },
    { name: 'Environmental', icon: <Waves className="w-4 h-4" />, count: 3 },
    { name: 'Maintenance', icon: <Wrench className="w-4 h-4" />, count: 2 }
  ];



  const filteredBlogs = allBlogs.filter(blog => {
    const matchesFilter = activeFilter === 'All' || blog.category === activeFilter;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            All Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive collection of expert insights, research findings, and technical guides on dam engineering and water resource management.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveFilter(category.name)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeFilter === category.name
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
                <span className="ml-1 bg-black/10 px-1.5 py-0.5 rounded text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium">
                    {blog.icon}
                    <span className="ml-1">{blog.category}</span>
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Author Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime}</span>
                    </div>
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Results Info */}
        <div className="text-center mt-8 text-gray-500">
          Showing {filteredBlogs.length} of {allBlogs.length} articles
          {activeFilter !== 'All' && ` in ${activeFilter}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-semibold border border-gray-200 transition-colors duration-200">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllBlogsSection;