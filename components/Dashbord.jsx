import React, { useState, useEffect } from 'react';
import { FileText, Eye, Users, Calendar, TrendingUp, Clock, Edit, Trash2 } from 'lucide-react';

const DashboardContentA = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all blogs for admin dashboard
      const response = await fetch('/api/blogs?includeAll=true&limit=100');
      const data = await response.json();
      
      if (data.success && data.blogs) {
        const blogs = data.blogs;
        
        // Calculate stats
        const publishedCount = blogs.filter(blog => blog.status === 'published' || blog.isPublished).length;
        const draftCount = blogs.filter(blog => blog.status === 'draft' || !blog.isPublished).length;
        const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
        
        setStats({
          totalBlogs: blogs.length,
          publishedBlogs: publishedCount,
          draftBlogs: draftCount,
          totalViews: totalViews
        });
        
        // Set recent blogs (latest 5)
        setRecentBlogs(blogs.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handlePublishBlog = async (blogId, currentStatus) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: currentStatus === 'published' ? 'draft' : 'published',
          isPublished: currentStatus !== 'published'
        }),
      });

      if (response.ok) {
        // Refresh dashboard data
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const response = await fetch(`/api/blogs?id=${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: "Total Blogs", 
            value: stats.totalBlogs.toString(), 
            color: "bg-blue-500",
            icon: FileText
          },
          { 
            title: "Published", 
            value: stats.publishedBlogs.toString(), 
            color: "bg-green-500",
            icon: Eye
          },
          { 
            title: "Drafts", 
            value: stats.draftBlogs.toString(), 
            color: "bg-yellow-500",
            icon: Edit
          },
          { 
            title: "Total Views", 
            value: stats.totalViews.toLocaleString(), 
            color: "bg-purple-500",
            icon: TrendingUp
          },
        ].map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Blogs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Blogs</h2>
        </div>
        <div className="p-6">
          {recentBlogs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No blogs found. Create your first blog!</p>
          ) : (
            <div className="space-y-4">
              {recentBlogs.map((blog) => {
                const isPublished = blog.status === 'published' || blog.isPublished;
                return (
                  <div key={blog._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{blog.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{blog.views || 0} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handlePublishBlog(blog._id, blog.status)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          isPublished
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete blog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      </div>
      
  );
};

export default DashboardContentA;