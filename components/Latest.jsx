"use client";

import React from 'react';
import { Clock, User, ArrowRight, Droplets } from 'lucide-react';
import {latestBlogs} from "@/assats/assats.jsx";
import Link from "next/link";
const LatestBlogsSection = () => {
  const featuredBlog = latestBlogs.find(blog => blog.featured);

  return (
    <section className="py-16 bg-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Droplets className="w-4 h-4 mr-2" />
            What We Do
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest developments in dam engineering, water resource management, and sustainable hydropower technologies.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article - Large */}
          <article className="lg:col-span-8 group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10]">
              <Link href={`/blogs/${latestBlogs[0].id}`}>
              <img
                src={latestBlogs[0].image}
                alt={latestBlogs[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {latestBlogs[0].icon}
                    <span className="ml-1">{latestBlogs[0].category}</span>
                  </span>
                </div>
                <Link href={`/blogs/${latestBlogs[0].id}`}>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">
                  {latestBlogs[0].title}
                </h3>
                </Link>
                <p className="text-white/90 text-sm line-clamp-2 mb-4">
                  {latestBlogs[0].excerpt}
                </p>
                <div className="flex items-center text-white/80 text-sm">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{latestBlogs[0].author}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="mr-4">{latestBlogs[0].readTime}</span>
                  <span>{latestBlogs[0].date}</span>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar Articles */}
          <div className="lg:col-span-4 space-y-6">
            {latestBlogs.slice(1, 4).map((blog) => (
              <article key={blog.id} className="group cursor-pointer">
                <div className="flex space-x-4">
                  <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                    <Link href={`/blogs/${blog.id}`}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center text-blue-600 text-xs font-medium">
                        {blog.icon}
                        <span className="ml-1">{blog.category}</span>
                      </span>
                    </div>
                    <Link href={`/blogs/${blog.id}`}>
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                        {blog.title}
                      </h4>
                    </Link>
                    <div className="flex items-center text-gray-500 text-xs">
                      <span className="mr-2">{blog.author}</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {latestBlogs.slice(3, 6).map((blog) => (
            <article key={blog.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] mb-4">
                <Link href={`/blogs/${blog.id}`}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {blog.icon}
                    <span className="ml-1">{blog.category}</span>
                  </span>
                </div>
              </div>
              <Link href={`/blogs/${blog.id}`}>
                <h4 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h4>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{blog.author}</span>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogsSection;