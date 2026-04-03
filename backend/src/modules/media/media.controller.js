const mediaService = require('./media.service');

async function getUploadUrl(req, res) {
  const userId = req.user.userId;
  const data = await mediaService.requestUploadUrl(userId, req.body);
  res.json({ success: true, data });
}

async function completeUpload(req, res) {
  const userId = req.user.userId;
  const data = await mediaService.completeUpload(userId, req.body);
  res.json({ success: true, data });
}

async function deleteMedia(req, res) {
  const userId = req.user.userId;
  const data = await mediaService.deleteMediaByKey(userId, req.body?.key, {
    courseId: req.body?.courseId || null,
    moduleId: req.body?.moduleId || null,
  });
  res.json({ success: true, data });
}

async function getMediaUrl(req, res) {
  const userId = req.user.userId;
  const data = await mediaService.getMediaSignedUrl(userId, req.params.id);
  res.json({ success: true, data });
}

module.exports = {
  completeUpload,
  deleteMedia,
  getMediaUrl,
  getUploadUrl,
};
