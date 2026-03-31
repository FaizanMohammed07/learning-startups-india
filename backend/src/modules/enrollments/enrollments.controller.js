const service = require('./enrollments.service');

async function listEnrollments(req, res) {
  const records = await service.listEnrollments(req.user.userId, req.query.courseId);
  res.json({ success: true, data: records });
}

async function createEnrollment(req, res) {
  const enrollment = await service.upsertEnrollment(req.user.userId, req.body);
  res.status(201).json({ success: true, data: enrollment });
}

async function createLessonProgress(req, res) {
  const progress = await service.upsertLessonProgress(req.user.userId, req.body);
  res.json({ success: true, data: progress });
}

module.exports = {
  listEnrollments,
  createEnrollment,
  createLessonProgress,
};
