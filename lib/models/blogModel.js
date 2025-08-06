import mongoose from "mongoose";

// Schema for individual content blocks in the blog
const ContentBlockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['paragraph', 'heading', 'image', 'list', 'quote', 'code', 'link', 'divider']
    },
    content: {
        type: String,
        required: function() {
            return this.type !== 'divider' && this.type !== 'image';
        }
    },
    // For headings (h1, h2, h3, h4, h5, h6)
    level: {
        type: Number,
        min: 1,
        max: 6,
        required: function() {
            return this.type === 'heading';
        }
    },
    // For images
    imageURL: {
        type: String,
        required: function() {
            return this.type === 'image';
        }
    },
    imageAlt: {
        type: String,
        default: ''
    },
    imageCaption: {
        type: String,
        default: ''
    },
    // For lists
    listType: {
        type: String,
        enum: ['ordered', 'unordered'],
        required: function() {
            return this.type === 'list';
        }
    },
    listItems: [{
        type: String
    }],
    // For links
    linkURL: {
        type: String,
        required: function() {
            return this.type === 'link';
        }
    },
    linkText: {
        type: String,
        required: function() {
            return this.type === 'link';
        }
    },
    // For code blocks
    language: {
        type: String,
        default: 'javascript'
    },
    // General styling options
    alignment: {
        type: String,
        enum: ['left', 'center', 'right'],
        default: 'left'
    },
    // Order for sorting blocks
    order: {
        type: Number,
        required: true
    }
});

// Main blog schema
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        maxLength: 500,
        trim: true
    },
    featuredImage: {
        type: String,
        required: true
    },
    featuredImageAlt: {
        type: String,
        default: ''
    },
    // Array of content blocks that make up the blog post
    content: [ContentBlockSchema],
    
    // Blog metadata
    author: {
        type: String,
        required: true,
        default: 'Admin'
    },
    category: {
        type: String,
        required: true,
        enum: ['Technology', 'Lifestyle', 'Business', 'Health', 'Travel', 'Food', 'Fashion', 'Sports', 'Entertainment', 'Other']
    },
    tags: [{
        type: String,
        trim: true
    }],
    
    // Publication status
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    
    // SEO fields
    metaDescription: {
        type: String,
        maxLength: 160
    },
    metaKeywords: [{
        type: String
    }],
    
    // Engagement metrics
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: {
        type: Date
    },
    
    // Reading time estimation (in minutes)
    readingTime: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true // This automatically manages createdAt and updatedAt
});

// Pre-save middleware to generate slug and calculate reading time
BlogSchema.pre('save', function(next) {
    // Generate slug from title if not provided
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    
    // Calculate reading time based on content
    let totalWords = 0;
    this.content.forEach(block => {
        if (block.content) {
            totalWords += block.content.split(' ').length;
        }
        if (block.listItems && block.listItems.length > 0) {
            block.listItems.forEach(item => {
                totalWords += item.split(' ').length;
            });
        }
    });
    
    // Average reading speed is 200 words per minute
    this.readingTime = Math.max(1, Math.ceil(totalWords / 200));
    
    // Update publishedAt when status changes to published
    if (this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    
    next();
});

// Index for better query performance
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default BlogModel;