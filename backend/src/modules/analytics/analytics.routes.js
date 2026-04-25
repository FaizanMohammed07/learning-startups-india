const express = require('express');
const controller = require('./analytics.controller');
const { authRequired } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/progress', authRequired, controller.getProgressOverview);
router.get('/progress/:userId', authRequired, controller.getProgressOverview);

router.get('/performance', authRequired, controller.getPerformanceAnalytics);
router.get('/performance/:userId', authRequired, controller.getPerformanceAnalytics);

router.get('/learning-time', authRequired, controller.getLearningTime);
router.get('/learning-time/:userId', authRequired, controller.getLearningTime);

router.get('/skills', authRequired, controller.getSkillGraph);
router.get('/skills/:userId', authRequired, controller.getSkillGraph);

module.exports = { analyticsRouter: router };
