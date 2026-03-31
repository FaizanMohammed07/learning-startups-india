const express = require('express');
const { z } = require('zod');
const { asyncHandler } = require('../../utils/asyncHandler');
const { validateBody } = require('../../middlewares/validateBody');
const { authRequired, requireRole } = require('../../middlewares/authMiddleware');
const controller = require('./profiles.controller');

const router = express.Router();

router.get('/mentors', asyncHandler(controller.listMentors));

router.post(
  '/mentors',
  validateBody(
    z.object({
      fullName: z.string().min(1),
      email: z.string().email(),
      currentRole: z.string().min(1),
      company: z.string().min(1),
      experience: z.string().min(1),
      expertise: z.array(z.string()).default([]),
      phone: z.string().optional(),
      profileImage: z.string().optional(),
      linkedinUrl: z.string().optional(),
      previousCompanies: z.array(z.string()).optional(),
      bio: z.string().optional(),
      availability: z.string().optional(),
      achievements: z.string().optional(),
    })
  ),
  asyncHandler(controller.createMentor)
);

router.get('/investors', asyncHandler(controller.listInvestors));

router.post(
  '/investors',
  validateBody(
    z.object({
      fullName: z.string().min(1),
      organizationName: z.string().optional(),
      investorType: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      linkedinUrl: z.string().optional(),
      websiteUrl: z.string().optional(),
      investmentFocus: z.array(z.string()).optional(),
      preferredStages: z.array(z.string()).optional(),
      ticketSize: z.string().optional(),
      bio: z.string().optional(),
      location: z.string().optional(),
      yearsOfExperience: z.number().optional(),
    })
  ),
  asyncHandler(controller.createInvestor)
);

router.patch(
  '/mentors/:id/status',
  authRequired,
  requireRole('admin'),
  validateBody(
    z.object({
      status: z.enum(['pending', 'approved', 'rejected', 'suspended']),
    })
  ),
  asyncHandler(controller.setMentorStatus)
);

router.patch(
  '/investors/:id/status',
  authRequired,
  requireRole('admin'),
  validateBody(
    z.object({
      status: z.enum(['pending', 'approved', 'rejected']),
      isVerified: z.boolean().optional(),
    })
  ),
  asyncHandler(controller.setInvestorStatus)
);

module.exports = { profilesRouter: router };
