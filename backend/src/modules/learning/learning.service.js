const { Quiz, QuizResponse, Progress } = require('./learning.model');

async function getQuizByVideo(userId, videoId) {
  const quizzes = await Quiz.find({ videoId }).lean();
  const quizIds = quizzes.map(q => q._id);
  const responses = await QuizResponse.find({ userId, quizId: { $in: quizIds } }).lean();
  return { quizzes, responses };
}

async function submitQuizResponses(userId, responsesInput) {
  const rows = responsesInput.map(r => ({
    userId,
    quizId: r.quizId,
    selectedOption: r.selectedOption,
    isCorrect: r.isCorrect,
  }));

  const data = await QuizResponse.insertMany(rows);
  const correctCount = responsesInput.filter(r => r.isCorrect).length;
  const totalQuestions = responsesInput.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    data,
    score,
    passed: score >= 75,
    correctCount,
    totalQuestions,
  };
}

async function getProgress(userId, videoId) {
  const query = { userId };
  if (videoId) query.videoId = videoId;
  return Progress.find(query).lean();
}

async function upsertProgress(userId, input) {
  return Progress.findOneAndUpdate(
    { userId, videoId: input.videoId },
    {
      $set: {
        watchedSeconds: input.watchedSeconds || 0,
        completed: input.completed || false,
      },
    },
    { upsert: true, new: true }
  ).lean();
}

module.exports = {
  getQuizByVideo,
  submitQuizResponses,
  getProgress,
  upsertProgress,
};
