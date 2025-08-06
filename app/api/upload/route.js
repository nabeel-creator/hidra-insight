import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import { Buffer } from 'buffer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get('image');

        // Validation
        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(image.type)) {
            return NextResponse.json({ 
                error: "Invalid file type. Only JPEG, PNG, WebP and GIF are allowed." 
            }, { status: 400 });
        }

        if (image.size > MAX_FILE_SIZE) {
            return NextResponse.json({ 
                error: "File too large. Maximum size is 5MB." 
            }, { status: 400 });
        }

        // Generate unique filename
        const fileExtension = image.name.split('.').pop();
        const uniqueFilename = `${uuidv4()}.${fileExtension}`;
        
        // Create file path
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, uniqueFilename);

        // Ensure upload directory exists
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Convert image to buffer and save
        const imageBufferData = await image.arrayBuffer();
        const buffer = Buffer.from(imageBufferData);
        await writeFile(filePath, buffer);
        
        // Return the public URL
        const imageURL = `/uploads/${uniqueFilename}`;
        
        return NextResponse.json({ 
            success: true,
            imageURL,
            filename: uniqueFilename,
            size: image.size,
            type: image.type
        });

    } catch (error) {
        console.error("Error in image upload:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET - List uploaded images (for admin panel)
export async function GET(request) {
    try {
        const fs = require('fs');
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
        if (!fs.existsSync(uploadDir)) {
            return NextResponse.json({ success: true, images: [] });
        }

        const files = fs.readdirSync(uploadDir);
        const images = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
            })
            .map(file => {
                const filePath = path.join(uploadDir, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    url: `/uploads/${file}`,
                    size: stats.size,
                    createdAt: stats.birthtime
                };
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return NextResponse.json({ success: true, images });

    } catch (error) {
        console.error("Error fetching images:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Delete uploaded image
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');
        
        if (!filename) {
            return NextResponse.json({ error: "Filename is required" }, { status: 400 });
        }

        const fs = require('fs');
        const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
        
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        fs.unlinkSync(filePath);
        
        return NextResponse.json({ 
            success: true, 
            message: "Image deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}