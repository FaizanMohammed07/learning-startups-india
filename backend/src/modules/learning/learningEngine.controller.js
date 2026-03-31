const engineService = require('./learningEngine.service');

async function getCourseDashboard(req, res) {
  const data = await engineService.getCourseDashboard(req.user.userId, req.params.courseId);
  res.json({ success: true, data });
}

async function getLessonDetail(req, res) {
  const data = await engineService.getLessonDetail(
    req.user.userId,
    req.params.courseId,
    req.params.lessonId
  );
  res.json({ success: true, data });
}

async function markLessonComplete(req, res) {
  const data = await engineService.markLessonComplete(
    req.user.userId,
    req.params.courseId,
    req.params.lessonId,
    req.body.timeSpentSeconds || 0
  );
  res.json({ success: true, data });
}

async function getModuleQuiz(req, res) {
  const data = await engineService.getModuleQuiz(
    req.user.userId,
    req.params.courseId,
    req.params.moduleId
  );
  res.json({ success: true, data });
}

async function submitModuleQuiz(req, res) {
  const { answers } = req.body;
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ success: false, error: 'answers array is required' });
  }
  const data = await engineService.submitModuleQuiz(
    req.user.userId,
    req.params.courseId,
    req.params.moduleId,
    answers
  );
  res.json({ success: true, data });
}

module.exports = {
  getCourseDashboard,
  getLessonDetail,
  markLessonComplete,
  getModuleQuiz,
  submitModuleQuiz,
};
