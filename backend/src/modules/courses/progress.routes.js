const express = require('express');
const router = express.Router();
const progressController = require('./progress.controller');

// POST /api/v1/courses/progress
router.post('/progress', progressController.updateProgress);

module.exports = router;
