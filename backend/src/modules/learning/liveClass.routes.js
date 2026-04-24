const express = require('express');
const controller = require('./learningExperience.controller');
const { authRequired, requireRole } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authRequired, controller.getLiveClasses);
router.post('/', authRequired, requireRole('admin', 'instructor'), controller.createLiveClass);
router.get('/:id', authRequired, controller.getLiveClassById);
router.post('/:id/join', authRequired, controller.joinLiveClass);
router.post('/:id/attendance', authRequired, controller.joinLiveClass); // Reuse join for attendance for now

module.exports = router;
