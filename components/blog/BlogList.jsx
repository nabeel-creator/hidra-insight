"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, Eye, Heart } from "lucide-react";
import Head from "next/head";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    category: "All",
    page: 1,
    limit: 6,
  });

  const categories = [
    "All",
    "General",
    "Technology",
    "Business",
    "Health",
    "Travel",
    "Food",
    "Lifestyle",
  ];

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        // IMPORTANT: Do NOT include includeAll=true here
        // This ensures only published blogs are shown to public
      });

      if (filters.category && filters.category !== "All") {
        queryParams.append("category", filters.category);
      }

      console.log("Fetching:", `/api/blogs?${queryParams.toString()}`);

      const response = await fetch(`/api/blogs?${queryParams.toString()}`);
      const data = await response.json();

      console.log("API Response:", data);

      if (data.success) {
        // Additional client-side filter to ensure only published blogs show
        const publishedBlogs = (data.blogs || []).filter(blog =>
          blog.status === 'published' || blog.isPublished === true
        );
        setBlogs(publishedBlogs);
        setPagination(data.pagination || {});
      } else {
        throw new Error(data.error || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Blogs
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7 py-7">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">All Blogs</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest insights, Reaserches and stories.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}


        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: filters.limit }).map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-xl border p-6 space-y-4">
                <div className="h-48 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={() => handleFilterChange({ page: filters.page - 1 })}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handleFilterChange({ page: filters.page + 1 })}
              disabled={!pagination.hasNext}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && (
          <>
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No published blogs found
                </h3>
                <p className="text-gray-600">
                  {filters.category !== "All"
                    ? `No published blogs found in "${filters.category}" category.`
                    : "No published blogs available at the moment."
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Featured Image */}
                    <Link href={`/blog/${blog.slug}`} className="block">
                      <div className="relative w-full h-48">
                        <Image
                          src={blog.featuredImage}
                          alt={blog.featuredImageAlt || blog.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                                           
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time>{formatDate(blog.publishedAt || blog.createdAt)}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.readingTime || 5} min read</span>
                        </div>
                      </div>

                      {/* Title */}
                      <Link href={`/blog/${blog.slug}`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{blog.author?.name || "Eng. Haseeb Ahsan"}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </>
        )}
      </div>
            <Head>
              <title>All Blogs | Haseeb's Blog</title>
              <meta name="description" content="Read expert insights and practical tips on dam management, water resources, water fields, crop watering, and more. Stay updated with the latest trends all curated by Haseeb Ahsan." />
              <meta name="keywords" content="dam, water reasorses, water fields, crops watring" />
              <meta name="author" content="Haseeb Ahsan" />
            </Head>
    </div>
  );
};


export default BlogList;
