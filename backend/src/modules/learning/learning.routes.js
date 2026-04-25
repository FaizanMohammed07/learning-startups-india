const express = require('express');
const { z } = require('zod');
const { authRequired } = require('../../middlewares/authMiddleware');
const { validateBody } = require('../../middlewares/validateBody');
const { asyncHandler } = require('../../utils/asyncHandler');
const controller = require('./learning.controller');

const router = express.Router();

router.get('/quiz', authRequired, asyncHandler(controller.listQuizByVideo));
router.post(
  '/quiz',
  authRequired,
  validateBody(
    z.object({
      responses: z
        .array(
          z.object({
            quizId: z.string().min(1),
            selectedOption: z.string().min(1),
            isCorrect: z.boolean(),
          })
        )
        .min(1),
    })
  ),
  asyncHandler(controller.submitQuiz)
);

const liveClassRouter = require('./liveClass.routes');
const recordedClassRouter = require('./recordedClass.routes');
const notesRouter = require('./notes.routes');

router.use('/live', liveClassRouter);
router.use('/recorded', recordedClassRouter);
router.use('/notes', notesRouter);

router.get('/continue', authRequired, asyncHandler(controller.listProgress)); // Alias for simplicity
router.get('/continue-learning', authRequired, asyncHandler(require('./learningExperience.controller').getContinueLearning));

module.exports = { learningRouter: router };
