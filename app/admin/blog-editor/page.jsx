// app/admin/blog-editor/page.jsx
import BlogEditor from '@/components/admin/BlogEditor';

export default function AdminBlogEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Optional: Add admin navigation header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel - Blog Editor</h1>
        </div>
      </div>
      
      {/* Blog Editor Component */}
      <BlogEditor />
    </div>
  );
}

// Optional: Add metadata for SEO
export const metadata = {
  title: 'Blog Editor - Admin Panel',
  description: 'Create and manage blog posts',
};