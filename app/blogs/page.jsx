// app/blogs/page.jsx
import BlogList from '@/components/blog/BlogList';

export default function BlogsPage() {
  return <BlogList />;
}

// SEO metadata
export const metadata = {
  title: 'All Articles - Water Resources Engineering Blog',
  description: 'Explore our latest articles on dam engineering, hydropower systems, water quality management, and sustainable infrastructure.',
  keywords: 'water resources, dam engineering, hydropower, sustainability, engineering articles',
};