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

router.get('/progress', authRequired, asyncHandler(controller.listProgress));
router.post(
  '/progress',
  authRequired,
  validateBody(
    z.object({
      videoId: z.string().min(1),
      watchedSeconds: z.number().nonnegative().optional(),
      completed: z.boolean().optional(),
    })
  ),
  asyncHandler(controller.saveProgress)
);

module.exports = { learningRouter: router };
