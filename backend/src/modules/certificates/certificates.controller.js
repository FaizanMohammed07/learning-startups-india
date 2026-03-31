const service = require('./certificates.service');

async function listCertificates(req, res) {
  const certificates = await service.listCertificates(req.user.userId, req.query.courseId);
  res.json({ success: true, data: certificates });
}

async function generateCertificate(req, res) {
  const { courseId } = req.body;
  const result = await service.generateCertificate(req.user.userId, courseId);

  if (result.alreadyExists) {
    return res.json({
      success: true,
      data: result.certificate,
      message: 'Certificate already exists',
    });
  }

  if (result.eligible === false) {
    return res
      .status(400)
      .json({ success: false, message: 'Course completion requirements not met' });
  }

  return res.status(201).json({ success: true, data: result.certificate });
}

module.exports = {
  listCertificates,
  generateCertificate,
};
