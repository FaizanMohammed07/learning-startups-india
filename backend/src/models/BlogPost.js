const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    coverImage: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, trim: true, default: 'general' },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    publishedAt: { type: Date, default: null },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = { BlogPost };
