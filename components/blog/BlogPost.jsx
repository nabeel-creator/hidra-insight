'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar, Tag, Share2, Bookmark, ArrowLeft, ExternalLink, Eye, Heart } from 'lucide-react';
import haseeb from '@/assats/haseeb.svg';

const BlogPostPage = ({ params }) => {
  // FIXED: Remove React.use() - just use params directly
  const [data, setData] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        
        console.log('Fetching blog with slug:', params.id);
        
        // FIXED: Use correct API endpoint
        const response = await fetch(`/api/blogs?slug=${params.id}`);
        const result = await response.json();
        
        console.log('Blog API response:', result);
        
        if (result.success) {
          setData(result.blog);
          
          // Fetch latest blogs for sidebar - FIXED: Remove status filter
          const latestResponse = await fetch(`/api/blogs?limit=4`);
          const latestResult = await latestResponse.json();
          
          console.log('Latest blogs response:', latestResult);
          
          if (latestResult.success) {
            // Filter out current blog from latest
            const filteredLatest = latestResult.blogs.filter(blog => blog.slug !== params.id);
            setLatestBlogs(filteredLatest.slice(0, 3));
          }
        } else {
          setError(result.error || 'Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchBlog();
    }
  }, [params?.id]);

  // FIXED: Updated renderContentBlock to handle your BlogEditor format
  const renderContentBlock = (block) => {
    if (!block || !block.content) return null;

    switch (block.type) {
      case 'paragraph':
        return (
          <p className="text-gray-700 leading-relaxed mb-6">
            {block.content}
          </p>
        );

      case 'heading':
        return (
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {block.content}
          </h2>
        );

      case 'image':
        return (
          <div className="mb-8">
            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden">
              <Image
                src={block.content}
                alt="Blog content image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
              />
            </div>
          </div>
        );

      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {block.content.split('\n').filter(item => item.trim()).map((item, index) => (
              <li key={index} className="leading-relaxed">
                {item.trim()}
              </li>
            ))}
          </ul>
        );

      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-4 rounded-r-lg">
            "{block.content}"
          </blockquote>
        );

      case 'code':
        return (
          <div className="mb-6">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{block.content}</code>
            </pre>
          </div>
        );

      case 'link':
        return (
          <div className="mb-6">
            <a
              href={block.content}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {block.content}
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>
        );

      default:
        return (
          <p className="text-gray-700 leading-relaxed mb-6">
            {block.content}
          </p>
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The requested article could not be found.'}</p>
          <Link href="/blogs" className="text-blue-600 hover:text-blue-700">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  // Author information
  const author = {
    name: "Enge. Hasseb Ahsan",
    title: "Senior Water Resources Engineer",
    bio: "With over 15 years of experience in dam engineering and water resource management, Enge. Hasseb Ahsan specializes in sustainable hydropower solutions and advanced water infrastructure design.",
    expertise: ["Dam Engineering", "Hydropower Systems", "Water Quality Management", "Sustainable Infrastructure"],
    image: haseeb
  };

  return (
    <article className="min-h-screen bg-white">
      <div className="head w-full h-18 bg-gray-200"></div>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7 py-3">
          <Link href="/blogs" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to Articles</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7 py-7">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <main className="lg:col-span-3">
            
            {/* Article Header */}
            <header className="mb-8">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {data.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <time dateTime={data.createdAt}>
                    {formatDate(data.createdAt)}
                  </time>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>6 min read</span>
                </div>
                
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {data.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-5">
                {data.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={author.image}
                      alt={author.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{author.name}</p>
                    <p className="text-sm text-gray-600">{author.title}</p>
                  </div>
                </div>
                
                {/* Share Buttons & Like */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-gray-500 text-sm mr-4">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>0</span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {data.featuredImage && (
              <div className="mb-8 relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src={data.featuredImage}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {/* FIXED: Render content blocks from your BlogEditor */}
                {data.content && data.content.length > 0 ? (
                  data.content.map((block, index) => (
                    <div key={block.id || index}>
                      {renderContentBlock(block)}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No content available.</p>
                )}
              </div>
            </div>

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Author Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                    <Image
                      src={author.image}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">{author.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{author.title}</p>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {author.bio}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {author.expertise.map((skill) => (
                      <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Follow Author
                </button>
              </div>

              {/* Latest Articles */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Latest Articles
                </h3>
                <div className="space-y-4">
                  {latestBlogs.map((blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog._id}>
                      <article className="group cursor-pointer">
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 flex-shrink-0 relative rounded-lg overflow-hidden">
                            <Image
                              src={blog.featuredImage}
                              alt={blog.title}
                              width={64}
                              height={64}
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(blog.createdAt)}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
                
                <Link href="/blogs" className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center">
                  <span>View All Articles</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;