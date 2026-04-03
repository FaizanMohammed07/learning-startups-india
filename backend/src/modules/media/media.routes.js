const { Router } = require('express');
const { authRequired, requireRole } = require('../../middlewares/authMiddleware');
const { asyncHandler } = require('../../utils/asyncHandler');
const ctrl = require('./media.controller');

const mediaRouter = Router();

mediaRouter.post(
  '/upload-url',
  authRequired,
  requireRole('admin', 'instructor'),
  asyncHandler(ctrl.getUploadUrl)
);

mediaRouter.post(
  '/complete',
  authRequired,
  requireRole('admin', 'instructor'),
  asyncHandler(ctrl.completeUpload)
);

mediaRouter.post(
  '/delete',
  authRequired,
  requireRole('admin', 'instructor'),
  asyncHandler(ctrl.deleteMedia)
);

mediaRouter.get('/:id', authRequired, asyncHandler(ctrl.getMediaUrl));

module.exports = { mediaRouter };
