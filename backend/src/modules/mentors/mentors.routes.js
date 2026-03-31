const express = require('express');
const router = express.Router();
const mentorsController = require('./mentors.controller');

// POST /api/v1/mentors/welcome
router.post('/welcome', mentorsController.sendWelcomeEmail);

module.exports = router;
