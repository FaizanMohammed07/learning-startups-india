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

async function listCourses(options = {}) {
  const { slug, category, level, search, page = 1, limit = 10 } = options;
  const filter = { isPublished: true };

  if (slug) {
    filter.slug = String(slug);
  }

  if (category) {
    filter.category = category;
  }

  if (level) {
    filter.difficultyLevel = level;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { introCopy: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [courses, total] = await Promise.all([
    Course.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Course.countDocuments(filter),
  ]);

  const decorated = await Promise.all(courses.map(decorateCourseMedia));

  return {
    items: decorated,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function toggleWishlist(userId, courseId) {
  const { User } = require('../users/user.model');
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const courseIndex = user.wishlist.indexOf(courseId);
  let status;

  if (courseIndex > -1) {
    user.wishlist.splice(courseIndex, 1);
    status = 'removed';
  } else {
    user.wishlist.push(courseId);
    status = 'added';
  }

  await user.save();
  return { status, wishlistCount: user.wishlist.length };
}

async function getUserWishlist(userId) {
  const { User } = require('../users/user.model');
  const user = await User.findById(userId).populate('wishlist').lean();
  if (!user) throw new Error('User not found');

  const courses = await Promise.all((user.wishlist || []).map(decorateCourseMedia));
  return courses;
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

async function markCourseComplete(userId, courseId) {
  const { Enrollment } = require('../enrollments/enrollment.model');
  const enrollment = await Enrollment.findOne({ userId, courseId });

  if (!enrollment) {
    throw new Error('You are not enrolled in this course');
  }

  if (enrollment.status === 'completed') {
    return enrollment;
  }

  enrollment.status = 'completed';
  enrollment.completed = true;
  enrollment.completedAt = new Date();
  await enrollment.save();

  return enrollment;
}

module.exports = {
  getCourseById,
  listCourses,
  listLessonsByModule,
  listModulesByCourse,
  submitQuiz,
  trackProgress,
  toggleWishlist,
  getUserWishlist,
  markCourseComplete,
};
