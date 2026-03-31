const service = require('./courses.service');
const enrollmentsService = require('../enrollments/enrollments.service');

async function listCourses(req, res) {
  const items = await service.listCourses(req.query.slug);
  res.json({ success: true, data: items });
}

async function getCourseById(req, res) {
  const course = await service.getCourseById(req.params.courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json({ success: true, data: course });
}

async function listModules(req, res) {
  const modules = await service.listModulesByCourse(req.params.courseId);
  res.json({ success: true, data: modules });
}

async function listLessons(req, res) {
  const lessons = await service.listLessonsByModule(req.params.moduleId);
  res.json({ success: true, data: lessons });
}

// Track video progress (enrollment required)
async function trackProgress(req, res) {
  const userId = req.user.userId;
  const { videoId, watchedSeconds, completed, courseId } = req.body;
  if (!videoId || !courseId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Enforce enrollment
  const enrolled = await enrollmentsService.listEnrollments(userId, courseId);
  if (!enrolled || enrolled.length === 0) {
    return res.status(403).json({ error: 'Not enrolled in course' });
  }
  const progress = await service.trackProgress(userId, {
    videoId,
    watchedSeconds,
    completed,
    courseId,
  });
  res.json({ success: true, data: progress });
}

// Submit quiz (enrollment required)
async function submitQuiz(req, res) {
  const userId = req.user.userId;
  const { responses, courseId } = req.body;
  if (!responses || !Array.isArray(responses) || !courseId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Enforce enrollment
  const enrolled = await enrollmentsService.listEnrollments(userId, courseId);
  if (!enrolled || enrolled.length === 0) {
    return res.status(403).json({ error: 'Not enrolled in course' });
  }
  const result = await service.submitQuiz(userId, { responses, courseId });
  res.json({ success: true, data: result });
}

module.exports = {
  listCourses,
  getCourseById,
  listModules,
  listLessons,
  trackProgress,
  submitQuiz,
};
