const { Certificate } = require('./certificate.model');
const { LessonProgress } = require('../enrollments/enrollment.model');
const { Module, Lesson, Course } = require('../courses/course.model');
const { QuizAttempt } = require('../learning/learning.model');
const { User } = require('../users/user.model');
const { jobQueue } = require('../../infrastructure/jobs/jobQueue');

function generateCertificateNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `CERT-${new Date().getFullYear()}-${random}`;
}

jobQueue.register('certificate.generated', async payload => {
  // Placeholder for async side effects (email/notification)
  return payload;
});

async function listCertificates(userId, courseId) {
  const query = { userId };
  if (courseId) query.courseId = courseId;
  return Certificate.find(query).sort({ createdAt: -1 }).lean();
}

async function generateCertificate(userId, courseId) {
  const existing = await Certificate.findOne({ userId, courseId }).lean();
  if (existing) {
    return { certificate: existing, alreadyExists: true };
  }

  const modules = await Module.find({ courseId }).lean();
  const moduleIds = modules.map(m => m._id);
  const lessons = await Lesson.find({ moduleId: { $in: moduleIds } }).lean();
  const lessonIds = lessons.map(l => l._id);

  const completedLessons = await LessonProgress.countDocuments({
    userId,
    courseId,
    lessonId: { $in: lessonIds },
    isCompleted: true,
  });

  const uniqueWeeks = [...new Set(modules.map(m => m.weekNumber))];
  const passedAttempts = await QuizAttempt.find({
    userId,
    weekNumber: { $in: uniqueWeeks },
    passed: true,
  }).lean();

  const passedWeekCount = new Set(passedAttempts.map(a => a.weekNumber)).size;
  const totalLessons = lessons.length;
  const isEligible =
    totalLessons > 0 && completedLessons === totalLessons && passedWeekCount === uniqueWeeks.length;

  if (!isEligible) {
    return { certificate: null, eligible: false };
  }

  const [user, course] = await Promise.all([
    User.findById(userId).lean(),
    Course.findById(courseId).lean(),
  ]);

  const certificate = await Certificate.create({
    userId,
    courseId,
    certificateNumber: generateCertificateNumber(),
    completionDate: new Date(),
    userName: user?.fullName || 'Participant',
    courseTitle: course?.title || 'Course',
    totalLessonsCompleted: completedLessons,
    totalQuizzesPassed: passedWeekCount,
    overallScore: 100,
    isVerified: true,
  });

  jobQueue.enqueue('certificate.generated', {
    certificateId: String(certificate._id),
    userId: String(userId),
    courseId: String(courseId),
  });

  return { certificate, eligible: true };
}

module.exports = {
  listCertificates,
  generateCertificate,
};
