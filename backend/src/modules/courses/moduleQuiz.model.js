const mongoose = require('mongoose');

const moduleQuizSchema = new mongoose.Schema(
  {
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    title: { type: String, default: 'Module Quiz' },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctOption: { type: Number, required: true },
      },
    ],
    passingScore: { type: Number, default: 70 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

moduleQuizSchema.index({ moduleId: 1 }, { unique: true });

const ModuleQuiz = mongoose.model('ModuleQuiz', moduleQuizSchema);

module.exports = { ModuleQuiz };
