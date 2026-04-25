const express = require('express');
const { z } = require('zod');
const { authRequired, requireRole } = require('../../middlewares/authMiddleware');
const { asyncHandler } = require('../../utils/asyncHandler');
const { validateBody } = require('../../middlewares/validateBody');
const controller = require('./users.controller');

const router = express.Router();

// GET /api/v1/users/admin/list
router.get(
  '/admin/list',
  authRequired,
  requireRole('admin'),
  asyncHandler(controller.listUsersForAdmin)
);

// PATCH /api/v1/users/me
router.patch(
  '/me',
  authRequired,
  validateBody(
    z
      .object({
        full_name: z.string().min(1).max(120).optional(),
        email_notifications: z.boolean().optional(),
        course_updates: z.boolean().optional(),
        marketing_emails: z.boolean().optional(),
      })
      .strict()
  ),
  asyncHandler(controller.updateMe)
);
 
// GET /api/v1/users/wishlist
router.get('/wishlist', authRequired, asyncHandler(controller.getWishlist));

module.exports = { usersRouter: router };
