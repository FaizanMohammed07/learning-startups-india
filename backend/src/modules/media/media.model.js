const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      default: null,
      index: true,
    },
    fileUrl: { type: String, required: true, trim: true },
    key: { type: String, required: true, unique: true, index: true },
    fileType: { type: String, required: true, trim: true },
    size: { type: Number, required: true, min: 0 },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Media = mongoose.model('Media', mediaSchema);

module.exports = { Media };
