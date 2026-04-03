const { Course, Module, Lesson } = require('./course.model');
const { Progress, Quiz, QuizResponse, QuizAttempt } = require('../learning/learning.model');
const { extractS3Key, generateDownloadUrl } = require('../../utils/s3');

const DOWNLOAD_URL_EXPIRY_SECONDS = 3600;

async function signFileUrl(fileUrl, explicitKey = null, expiresIn = DOWNLOAD_URL_EXPIRY_SECONDS) {
  const key = explicitKey || extractS3Key(fileUrl);
  if (!key) return fileUrl;

  const signedUrl = await generateDownloadUrl(key, expiresIn);
  return signedUrl || fileUrl;
}

async function decorateCourseMedia(course) {
  if (!course) return course;

  return {
    ...course,
    thumbnailUrl: await signFileUrl(course.thumbnailUrl, course.thumbnailKey),
    price: course.priceInr || 0,
  };
}

async function listCourses(slug) {
  const filter = { isPublished: true };
  if (slug) {
    filter.slug = String(slug);
  }

  const courses = await Course.find(filter).sort({ createdAt: -1 }).lean();
  return Promise.all(courses.map(decorateCourseMedia));
}

async function getCourseById(id) {
  const course = await Course.findById(id).lean();
  if (!course) return null;

  return decorateCourseMedia(course);
}

async function listModulesByCourse(courseId) {
  return Module.find({ courseId }).sort({ sortOrder: 1 }).lean();
}

async function listLessonsByModule(moduleId) {
  return Lesson.find({ moduleId }).sort({ sortOrder: 1 }).lean();
}

async function trackProgress(userId, { videoId, watchedSeconds, completed, courseId }) {
  return Progress.findOneAndUpdate(
    { userId, videoId },
    { $set: { watchedSeconds: watchedSeconds || 0, completed: !!completed } },
    { upsert: true, new: true }
  ).lean();
}

async function submitQuiz(userId, { responses, courseId }) {
  if (!responses || responses.length === 0) {
    return { score: 0, passed: false, correctCount: 0, totalQuestions: 0 };
  }

  const quizIds = responses.map(r => r.quizId);
  const quizzes = await Quiz.find({ _id: { $in: quizIds } }).lean();
  const quizMap = {};
  quizzes.forEach(q => {
    quizMap[String(q._id)] = q;
  });

  let correctCount = 0;
  const graded = responses.map(r => {
    const quiz = quizMap[String(r.quizId)];
    const isCorrect = quiz && Number(r.selectedOptionIndex) === quiz.correctOptionIndex;
    if (isCorrect) correctCount++;
    return {
      userId,
      quizId: r.quizId,
      selectedOption: String(r.selectedOptionIndex),
      isCorrect: !!isCorrect,
    };
  });

  await QuizResponse.insertMany(graded);

  const totalQuestions = responses.length;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = percentage >= 75;

  const weekNumber = quizzes[0]?.weekNumber;
  if (weekNumber != null) {
    await QuizAttempt.create({
      userId,
      weekNumber,
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      answers: graded,
    });
  }

  return { score: percentage, passed, correctCount, totalQuestions };
}

module.exports = {
  getCourseById,
  listCourses,
  listLessonsByModule,
  listModulesByCourse,
  submitQuiz,
  trackProgress,
};
