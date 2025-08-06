import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
    await ConnectDB();
}

// Initialize DB connection
loadDB();

// GET - Fetch all blogs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    if (slug) {
      // Get single blog by slug
      const blog = await BlogModel.findOne({ slug }).lean();
      
      if (!blog) {
        return NextResponse.json({ 
          success: false,
          error: "Blog not found" 
        }, { status: 404 });
      }
      
      return NextResponse.json({ 
        success: true, 
        blog 
      });
    } else {
      // Get multiple blogs - FIXED QUERY
      let query = {  }; // Changed from status to isPublished
      
      if (category && category !== 'All') {
        query.category = category;
      }

      const [blogs, total] = await Promise.all([
        BlogModel.find(query)
          .select('title slug excerpt featuredImage author category tags createdAt isPublished')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        BlogModel.countDocuments(query)
      ]);

      const totalPages = Math.ceil(total / limit);

      // Add missing fields for BlogList component
      const blogsWithDefaults = blogs.map(blog => ({
        ...blog,
        publishedAt: blog.createdAt, // Use createdAt as publishedAt
        readingTime: 5, // Default reading time
        views: 0, // Default views
        likes: 0, // Default likes
        featuredImageAlt: blog.title // Use title as alt text
      }));

      return NextResponse.json({
        success: true,
        blogs: blogsWithDefaults,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ 
      success: false,
      error: "Internal server error" 
    }, { status: 500 });
  }
}

// POST - Create new blog - SIMPLIFIED
export async function POST(request) {
    try {
        const body = await request.json();
        
        // Simple validation
        const { title, excerpt, featuredImage, content } = body;
        if (!title || !excerpt || !featuredImage) {
            return NextResponse.json({ 
                error: "Missing required fields: title, excerpt, featuredImage" 
            }, { status: 400 });
        }

        // Generate slug from title if not provided
        let slug = body.slug;
        if (!slug) {
            slug = title
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        }

        // Check if slug already exists
        const existingBlog = await BlogModel.findOne({ slug });
        if (existingBlog) {
            slug = `${slug}-${Date.now()}`;
        }

        // Create new blog - MATCH YOUR BLOGEDITOR FIELDS
        const newBlog = new BlogModel({
            title,
            slug,
            excerpt,
            featuredImage,
            content: Array.isArray(content) ? content : [],
            category: body.category || 'General',
            tags: body.tags || [],
            isPublished: body.isPublished || false, // Use isPublished instead of status
            author: body.author || 'Admin',
        });

        await newBlog.save();

        return NextResponse.json({ 
            success: true, 
            message: "Blog created successfully",
            blog: newBlog
        }, { status: 201 });

    } catch (error) {
        console.error("Error in POST handler:", error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ 
                error: "Validation error: " + error.message 
            }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Add this DELETE function to your existing blog API file (alongside GET and POST)

// DELETE - Delete a blog
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const id = searchParams.get('id');
        
        if (!slug && !id) {
            return NextResponse.json({ 
                success: false,
                error: "Either slug or id is required" 
            }, { status: 400 });
        }

        // Find and delete the blog
        let deletedBlog;
        if (slug) {
            deletedBlog = await BlogModel.findOneAndDelete({ slug });
        } else {
            deletedBlog = await BlogModel.findByIdAndDelete(id);
        }
        
        if (!deletedBlog) {
            return NextResponse.json({ 
                success: false,
                error: "Blog not found" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Blog deleted successfully",
            deletedBlog: {
                id: deletedBlog._id,
                title: deletedBlog.title,
                slug: deletedBlog.slug
            }
        });

    } catch (error) {
        console.error("Error in DELETE handler:", error);
        return NextResponse.json({ 
            success: false,
            error: "Internal server error" 
        }, { status: 500 });
    }
}