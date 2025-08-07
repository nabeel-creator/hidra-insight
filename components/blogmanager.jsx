import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Edit, AlertTriangle, Globe, FileText, Clock } from 'lucide-react';

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [publishing, setPublishing] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, published, draft

  // Fetch all blogs including drafts for admin
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      // Use includeAll=true to get all blogs including drafts
      const response = await fetch('/api/blogs?includeAll=true&limit=100');
      const data = await response.json();

      console.log('Fetched blogs:', data); // Debug log

      if (data.success) {
        setBlogs(data.blogs || []);
      } else {
        setError(data.error || 'Failed to fetch blogs');
      }
    } catch (err) {
      setError('Error fetching blogs: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };


  // Toggle publish status
  const togglePublishStatus = async (blog) => {
    try {
      setPublishing(blog._id);
      setError('');

      const newStatus = blog.status === 'published' ? 'draft' : 'published';
      const newIsPublished = newStatus === 'published';

      // FIX: Change the URL to use a query parameter `?id=`
      const response = await fetch(`/api/blogs?id=${blog._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          isPublished: newIsPublished,
          // Also update the publishedAt date when publishing
          publishedAt: newIsPublished ? new Date() : null
        }),
      });

      const data = await response.json();

      if (!response.ok) { // More robust error checking
        throw new Error(data.error || 'Failed to update blog status');
      }

      if (data.success) {
        // Update the blog in our local state
        setBlogs(blogs.map(b =>
          b._id === blog._id
            ? { ...b, status: newStatus, isPublished: newIsPublished, publishedAt: data.blog.publishedAt }
            : b
        ));
      } else {
        setError(data.error || 'Failed to update blog status');
      }
    } catch (err) {
      setError('Error updating blog status: ' + err.message);
      console.error('Update error:', err);
    } finally {
      setPublishing(null);
    }
  };
  // Delete blog
  const deleteBlog = async (blogId, slug) => {
    try {
      setDeleting(blogId);
      setError('');

      const response = await fetch(`/api/blogs?id=${blogId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        setShowDeleteConfirm(null);
      } else {
        setError(data.error || 'Failed to delete blog');
      }
    } catch (err) {
      setError('Error deleting blog: ' + err.message);
      console.error('Delete error:', err);
    } finally {
      setDeleting(null);
    }
  };

  // Filter blogs based on status
  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'published') {
      return blog.status === 'published' || blog.isPublished;
    } else if (filter === 'draft') {
      return blog.status === 'draft' || !blog.isPublished;
    }
    return true; // 'all'
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading blogs...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Blogs</h2>
        <p className="text-gray-600">View and manage all your blog posts</p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
        >
          All Blogs ({blogs.length})
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'published'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
        >
          Published ({blogs.filter(b => b.status === 'published' || b.isPublished).length})
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'draft'
              ? 'bg-yellow-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
        >
          Drafts ({blogs.filter(b => b.status === 'draft' || !b.isPublished).length})
        </button>
        <button
          onClick={fetchBlogs}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => setError('')}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">
            No {filter !== 'all' ? filter : ''} blogs found
          </p>
          <p className="text-gray-400 text-sm">
            {filter === 'draft' ? 'Create some drafts to see them here' :
              filter === 'published' ? 'Publish some blogs to see them here' :
                'Create your first blog to get started'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => {
                  const isPublished = blog.status === 'published' || blog.isPublished;
                  return (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-4">
                          {blog.featuredImage && (
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/400/300';
                              }}
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {blog.excerpt}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Slug: {blog.slug}
                            </p>
                            {blog.tags && blog.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {blog.tags.slice(0, 3).map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                                {blog.tags.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                    +{blog.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {isPublished ? 'Published' : 'Draft'}
                        </span>
                        {isPublished && blog.publishedAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            Published: {formatDate(blog.publishedAt)}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(blog.createdAt)}
                        <p className="text-xs text-gray-400 mt-1">
                          {blog.readingTime || 5} min read
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {/* View Button */}
                          <button
                            onClick={() => {
                              if (isPublished) {
                                window.open(`/blog/${blog.slug}`, '_blank');
                              } else {
                                alert('This blog is not published yet. Publish it first to view.');
                              }
                            }}
                            className={`p-2 rounded-md transition-colors ${isPublished
                                ? 'text-blue-600 hover:bg-blue-100'
                                : 'text-gray-400 cursor-not-allowed'
                              }`}
                            title={isPublished ? "View Blog" : "Blog not published"}
                            disabled={!isPublished}
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Button (placeholder) */}
                          <button
                            onClick={() => {
                              // TODO: Implement edit functionality
                              alert('Edit functionality coming soon!');
                            }}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            title="Edit Blog"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Publish/Unpublish Button */}
                          <button
                            onClick={() => togglePublishStatus(blog)}
                            disabled={publishing === blog._id}
                            className={`p-2 rounded-md transition-colors text-sm px-3 py-1 font-medium ${isPublished
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                              } ${publishing === blog._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={isPublished ? "Unpublish Blog" : "Publish Blog"}
                          >
                            {publishing === blog._id ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                                ...
                              </div>
                            ) : (
                              isPublished ? 'Unpublish' : 'Publish'
                            )}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setShowDeleteConfirm(blog)}
                            disabled={deleting === blog._id}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors disabled:opacity-50"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Delete Blog</h3>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete "{showDeleteConfirm.title}"? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteBlog(showDeleteConfirm._id, showDeleteConfirm.slug)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 flex items-center"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogManager;