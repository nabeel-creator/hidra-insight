// app/blog/[slug]/page.jsx
import BlogPostPage from '@/components/blog/BlogPost';

// This is your main blog post route - SEO friendly URLs
export default function BlogPostBySlugPage({ params }) {
  // The params.slug will be passed to your BlogPost component
  // Your BlogPost component expects params.id, so we map slug to id
  const modifiedParams = {
    id: params.slug // Map slug to id for your existing component
  };
  
  return <BlogPostPage params={modifiedParams} />;
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  try {
    // Fetch all published blogs to generate static routes
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs?status=published&limit=100`, {
      cache: 'no-store'
    });
    
    const result = await response.json();
    
    if (result.success) {
      return result.blogs.map((blog) => ({
        slug: blog.slug,
      }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  
  return []; // Return empty array if fetch fails
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs?slug=${params.slug}`, {
      cache: 'no-store'
    });
    
    const result = await response.json();
    
    if (result.success && result.blog) {
      const blog = result.blog;
      
      return {
        title: `${blog.title} | Water Resources Engineering`,
        description: blog.metaDescription || blog.excerpt,
        keywords: blog.metaKeywords?.join(', ') || blog.tags?.join(', '),
        authors: [{ name: blog.author }],
        
        // Open Graph for social media sharing
        openGraph: {
          title: blog.title,
          description: blog.excerpt,
          images: [
            {
              url: blog.featuredImage,
              width: 1200,
              height: 630,
              alt: blog.featuredImageAlt || blog.title,
            }
          ],
          type: 'article',
          publishedTime: blog.publishedAt,
          authors: [blog.author],
          tags: blog.tags,
          siteName: 'Water Resources Engineering Blog',
        },
        
        // Twitter Card
        twitter: {
          card: 'summary_large_image',
          title: blog.title,
          description: blog.excerpt,
          images: [blog.featuredImage],
          creator: `@${blog.author.replace(/\s+/g, '').toLowerCase()}`,
        },
        
        // Additional SEO
        alternates: {
          canonical: `/blog/${params.slug}`,
        },
        
        // Schema.org structured data
        other: {
          'article:author': blog.author,
          'article:published_time': blog.publishedAt,
          'article:modified_time': blog.updatedAt,
          'article:section': blog.category,
          'article:tag': blog.tags?.join(','),
        }
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata
  return {
    title: 'Article Not Found | Water Resources Engineering',
    description: 'The requested article could not be found.',
  };
}