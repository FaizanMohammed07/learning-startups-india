const express = require('express');
const router = express.Router();
const quizController = require('./quiz.controller');

// POST /api/v1/courses/quiz
router.post('/quiz', quizController.submitQuiz);

module.exports = router;
