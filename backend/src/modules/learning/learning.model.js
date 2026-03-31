const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    url: { type: String, default: null },
    weekNumber: { type: Number, default: null },
    orderIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const quizSchema = new mongoose.Schema(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
    question: { type: String, required: true },
    options: { type: [String], default: [] },
    correctOptionIndex: { type: Number, required: true },
    weekNumber: { type: Number, default: null },
  },
  { timestamps: true }
);

const quizResponseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
    selectedOption: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    weekNumber: { type: Number, required: true, index: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    answers: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

const assignmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
    submissionUrl: { type: String, default: null },
    notes: { type: String, default: null },
  },
  { timestamps: true }
);

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
    completed: { type: Boolean, default: false },
    watchedSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

const Video = mongoose.model('Video', videoSchema);
const Quiz = mongoose.model('Quiz', quizSchema);
const QuizResponse = mongoose.model('QuizResponse', quizResponseSchema);
const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);
const Progress = mongoose.model('Progress', progressSchema);

module.exports = {
  Video,
  Quiz,
  QuizResponse,
  QuizAttempt,
  Assignment,
  Progress,
};
