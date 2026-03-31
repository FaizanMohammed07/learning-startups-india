const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    company: { type: String, trim: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatarUrl: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

testimonialSchema.index({ status: 1, isFeatured: -1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = { Testimonial };
