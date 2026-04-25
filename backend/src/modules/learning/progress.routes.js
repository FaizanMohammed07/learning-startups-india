const express = require('express');
const controller = require('./learningExperience.controller');
const { authRequired, requireRole } = require('../../middlewares/authMiddleware');

const router = express.Router();

/**
 * Progress Routes
 */
router.get('/progress', authRequired, controller.getProgress);
router.post('/progress', authRequired, controller.updateProgress);
router.patch('/progress/:id', authRequired, controller.updateProgress);
router.get('/continue/:userId', authRequired, controller.getContinueLearning);

module.exports = router;
