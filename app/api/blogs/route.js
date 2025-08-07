import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
    await ConnectDB();
}

// Initialize DB connection
loadDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status'); // 'published', 'draft', or null
    const includeAll = searchParams.get('includeAll'); // for admin dashboard
    const slug = searchParams.get('slug'); // for single blog

    let query = {};
    
    // If requesting a specific blog by slug
    if (slug) {
      query.slug = slug;
      const blog = await BlogModel.findOne(query);
      return Response.json({
        success: true,
        blog
      });
    }
    
    // Filter logic - THIS IS THE KEY FIX
    if (includeAll === 'true') {
      // Admin can see all blogs - no filter
    } else if (status) {
      // Filter by specific status
      if (status === 'published') {
        query.$or = [
          { status: 'published' },
          { isPublished: true }
        ];
      } else if (status === 'draft') {
        query.$or = [
          { status: 'draft' },
          { isPublished: false },
          { isPublished: { $exists: false } }
        ];
      }
    } else {
      // Default: only published blogs for public (BlogList component)
      query.$or = [
        { status: 'published' },
        { isPublished: true }
      ];
    }

    const skip = (page - 1) * limit;
    
    const [blogs, total] = await Promise.all([
      BlogModel.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return Response.json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new blog
export async function POST(request) {
    try {
        const body = await request.json();
        
        console.log("Received blog data:", body); // Debug log
        
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

        // Check if slug already exists and generate unique slug
        let uniqueSlug = slug;
        let counter = 1;
        while (await BlogModel.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }
        slug = uniqueSlug;

        // Create new blog with proper status handling
        const blogData = {
            title,
            slug,
            excerpt,
            featuredImage,
            content: Array.isArray(content) ? content : [],
            category: body.category || 'General', // Default to General
            tags: body.tags || [],
            isPublished: body.isPublished || false,
            status: body.isPublished ? 'published' : 'draft',
            author: body.author || 'Admin',
            featuredImageAlt: body.featuredImageAlt || '',
            publishedAt: body.isPublished ? new Date() : null
        };

        console.log("Creating blog with data:", blogData); // Debug log

        const newBlog = new BlogModel(blogData);
        await newBlog.save();

        return NextResponse.json({ 
            success: true, 
            message: `Blog ${body.isPublished ? 'published' : 'saved as draft'} successfully`,
            blog: newBlog
        }, { status: 201 });

    } catch (error) {
        console.error("Error in POST handler:", error);
        if (error.name === 'ValidationError') {
            const validationErrors = Object.keys(error.errors).map(key => {
                return `${key}: ${error.errors[key].message}`;
            }).join(', ');
            
            return NextResponse.json({ 
                error: "Validation error: " + validationErrors 
            }, { status: 400 });
        }
        return NextResponse.json({ 
            error: "Internal server error: " + error.message 
        }, { status: 500 });
    }
}

// PATCH - Update blog status (for publish/unpublish)
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const slug = searchParams.get('slug');
        
        if (!id && !slug) {
            return NextResponse.json({ 
                success: false,
                error: "Either id or slug is required" 
            }, { status: 400 });
        }

        let filter = {};
        if (id) filter._id = id;
        if (slug) filter.slug = slug;

        const updateData = {
            ...body,
            publishedAt: body.isPublished ? new Date() : null
        };

        const updatedBlog = await BlogModel.findOneAndUpdate(
            filter,
            updateData,
            { new: true }
        );
        
        if (!updatedBlog) {
            return NextResponse.json({ 
                success: false,
                error: "Blog not found" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {
        console.error("Error in PATCH handler:", error);
        return NextResponse.json({ 
            success: false,
            error: "Internal server error" 
        }, { status: 500 });
    }
}

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