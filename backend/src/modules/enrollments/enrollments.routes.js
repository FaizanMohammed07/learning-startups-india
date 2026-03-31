const express = require('express');
const { z } = require('zod');
const { authRequired } = require('../../middlewares/authMiddleware');
const { validateBody } = require('../../middlewares/validateBody');
const { asyncHandler } = require('../../utils/asyncHandler');
const controller = require('./enrollments.controller');

const router = express.Router();

// GET /api/v1/enrollments
router.get('/', authRequired, asyncHandler(controller.listEnrollments));

// POST /api/v1/enrollments
router.post(
  '/',
  authRequired,
  validateBody(
    z.object({
      courseId: z.string().min(1),
      paymentStatus: z
        .enum(['free', 'paid', 'scholarship', 'pending', 'completed', 'failed'])
        .optional(),
      stripePaymentId: z.string().optional().nullable(),
      paymentMethod: z.string().optional().nullable(),
      amountPaid: z.number().nonnegative().optional(),
    })
  ),
  asyncHandler(controller.createEnrollment)
);

// POST /api/v1/enrollments/lesson-progress
router.post(
  '/lesson-progress',
  authRequired,
  validateBody(
    z.object({
      courseId: z.string().min(1),
      lessonId: z.string().min(1),
      lessonTitle: z.string().optional().nullable(),
      isCompleted: z.boolean().default(true),
    })
  ),
  asyncHandler(controller.createLessonProgress)
);

module.exports = { enrollmentsRouter: router };
