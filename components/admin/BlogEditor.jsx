"use client";

import React, { useState } from "react";
import {
  Plus,
  Image,
  Type,
  List,
  Quote,
  Code,
  Link,
  Minus,
  Save,
  Eye,
} from "lucide-react";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState("General");

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let the browser set it with boundary
      });

      if (response.ok) {
        const result = await response.json();
        setFeaturedImage(result.imageURL);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Add content block
  const addContentBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type: type,
      content: "",
      // Add model-required fields
      ...(type === "heading" && { level: 2 }),
      ...(type === "list" && { listType: "unordered", listItems: [] }),
      ...(type === "image" && { imageURL: "", imageAlt: "", imageCaption: "" }),
      ...(type === "link" && { linkURL: "", linkText: "" }),
      ...(type === "code" && { language: "javascript" }),
      alignment: "left",
      order: content.length,
    };
    setContent([...content, newBlock]);
  };

  // Update content block
  const updateContentBlock = (id, newContent) => {
    setContent(
      content.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  // Remove content block
  const removeContentBlock = (id) => {
    setContent(content.filter((block) => block.id !== id));
  };

  // Add tag
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const saveBlog = async () => {
    try {
      // Validate required fields
      if (!title.trim()) {
        alert("Please enter a title");
        return;
      }

      if (!excerpt.trim()) {
        alert("Please enter an excerpt");
        return;
      }

      if (!featuredImage.trim()) {
        alert("Please add a featured image");
        return;
      }

      // Transform content blocks to match model
      const transformedContent = content
        .filter((block) => block.content && block.content.trim() !== "")
        .map((block) => {
          const baseBlock = {
            type: block.type,
            content: block.content.trim(),
            alignment: block.alignment || "left",
            order: block.order || content.indexOf(block),
          };

          // Add type-specific fields
          switch (block.type) {
            case "heading":
              return { ...baseBlock, level: block.level || 2 };
            case "list":
              return {
                ...baseBlock,
                listType: block.listType || "unordered",
                listItems: block.content
                  .split("\n")
                  .filter((item) => item.trim()),
              };
            case "image":
              return {
                ...baseBlock,
                imageURL: block.content,
                imageAlt: block.imageAlt || "",
                imageCaption: block.imageCaption || "",
              };
            case "link":
              return {
                ...baseBlock,
                linkURL: block.content,
                linkText: block.linkText || block.content,
              };
            case "code":
              return {
                ...baseBlock,
                language: block.language || "javascript",
              };
            default:
              return baseBlock;
          }
        });

      if (transformedContent.length === 0) {
        alert("Please add some content blocks");
        return;
      }

      // In BlogEditor.jsx, update the blogData object:
      const blogData = {
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        excerpt: excerpt.trim(),
        content: transformedContent,
        featuredImage: featuredImage.trim(),
        category: category.trim() || "General",
        tags: tags.filter((tag) => tag.trim() !== ""),
        status: isPublished ? 'published' : 'draft', // MUST use 'status' not 'isPublished'
        author: "Admin",
        featuredImageAlt: "", // Add this field to match model
      };
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Blog saved successfully!");
        console.log("Blog saved:", result);
        // Optionally reset form
        // resetForm();
      } else {
        throw new Error(result.error || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Error saving blog: " + error.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setContent([]);
    setSlug("");
    setExcerpt("");
    setFeaturedImage("");
    setCategory("General");
    setTags([]);
    setNewTag("");
    setIsPublished(false);
    setIsPreview(false);
  };

  // Render content block based on type
  const renderContentBlock = (block) => {
    const commonProps = {
      value: block.content,
      onChange: (e) => updateContentBlock(block.id, e.target.value),
      className:
        "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    };

    switch (block.type) {
      case "paragraph":
        return (
          <textarea
            {...commonProps}
            placeholder="Write your paragraph here..."
            rows="4"
          />
        );
      case "heading":
        return (
          <input
            {...commonProps}
            type="text"
            placeholder="Enter heading..."
            className={`text-2xl font-bold ${commonProps.className}`}
          />
        );
      case "list":
        return (
          <textarea
            {...commonProps}
            placeholder="Enter list items (one per line)..."
            rows="4"
          />
        );
      case "quote":
        return (
          <textarea
            {...commonProps}
            placeholder="Enter quote..."
            rows="3"
            className={`italic border-l-4 border-blue-500 ${commonProps.className}`}
          />
        );
      case "code":
        return (
          <textarea
            {...commonProps}
            placeholder="Enter code..."
            rows="6"
            className={`font-mono text-sm ${commonProps.className}`}
          />
        );
      case "image":
        return (
          <input
            {...commonProps}
            type="text"
            placeholder="Enter image URL..."
          />
        );
      case "link":
        return (
          <input {...commonProps} type="text" placeholder="Enter URL..." />
        );
      default:
        return (
          <textarea {...commonProps} placeholder="Enter content..." rows="4" />
        );
    }
  };

  // Render preview
  const renderPreview = (block) => {
    if (!block.content) return null;

    switch (block.type) {
      case "paragraph":
        return <p className="mb-4 leading-relaxed">{block.content}</p>;
      case "heading":
        return <h2 className="text-2xl font-bold mb-4">{block.content}</h2>;
      case "list":
        return (
          <ul className="list-disc list-inside mb-4 space-y-2">
            {block.content
              .split("\n")
              .filter((item) => item.trim())
              .map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
          </ul>
        );
      case "quote":
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4">
            {block.content}
          </blockquote>
        );
      case "code":
        return (
          <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-sm font-mono">{block.content}</code>
          </pre>
        );
      case "image":
        return (
          <div className="mb-4">
            <img
              src={block.content}
              alt="Blog content"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        );
      case "link":
        return (
          <p className="mb-4">
            <a
              href={block.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {block.content}
            </a>
          </p>
        );
      default:
        return <p className="mb-4">{block.content}</p>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Blog Editor</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Eye size={16} />
                {isPreview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={saveBlog}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Save size={16} />
                Save Blog
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter blog title..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-friendly-slug"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your blog post..."
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="Or enter image URL..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {featuredImage && (
                  <div className="mt-2">
                    <img
                      src={featuredImage}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              >
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder="Add a tag..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Minus size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </label>
          </div>
        </div>

        {/* Content Editor/Preview */}
        <div className="p-6">
          {!isPreview ? (
            <div>
              {/* Content Blocks */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Content
                </h3>
                <div className="space-y-4">
                  {content.map((block, index) => (
                    <div
                      key={block.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {block.type} Block
                        </span>
                        <button
                          onClick={() => removeContentBlock(block.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                      {renderContentBlock(block)}
                    </div>
                  ))}
                </div>

                {/* Add Content Buttons */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Add Content Block
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => addContentBlock("paragraph")}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Type size={16} />
                      Paragraph
                    </button>
                    <button
                      onClick={() => addContentBlock("heading")}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Type size={16} />
                      Heading
                    </button>
                    <button
                      onClick={() => addContentBlock("list")}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <List size={16} />
                      List
                    </button>
                    <button
                      onClick={() => addContentBlock("quote")}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Quote size={16} />
                      Quote
                    </button>
                    <button
                      onClick={() => addContentBlock("code")}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Code size={16} />
                      Code
                    </button>
                    <button
                      onClick={() => addContentBlock("image")}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image size={16} />
                      Image
                    </button>
                    <button
                      onClick={() => addContentBlock("link")}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Link size={16} />
                      Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Preview
              </h3>
              <div className="prose max-w-none">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                {featuredImage && (
                  <img
                    src={featuredImage}
                    alt={title}
                    className="w-full max-w-2xl h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <p className="text-lg text-gray-600 mb-6 italic">{excerpt}</p>
                <div className="space-y-4">
                  {content.map((block, index) => (
                    <div key={block.id}>{renderPreview(block)}</div>
                  ))}
                </div>
                {tags.length > 0 && (
                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Tags:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
