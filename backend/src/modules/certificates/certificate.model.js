const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    certificateNumber: { type: String, required: true, unique: true, index: true },
    completionDate: { type: Date, required: true },
    userName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    totalLessonsCompleted: { type: Number, default: 0 },
    totalQuizzesPassed: { type: Number, default: 0 },
    overallScore: { type: Number, default: 100 },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

certificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = { Certificate };
