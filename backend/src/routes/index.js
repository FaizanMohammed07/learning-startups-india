const { authRouter } = require('../modules/auth/auth.routes');
const { usersRouter } = require('../modules/users/users.routes');
const { coursesRouter } = require('../modules/courses/courses.routes');
const { enrollmentsRouter } = require('../modules/enrollments/enrollments.routes');
const { paymentsRouter } = require('../modules/payments/payments.routes');
const { certificatesRouter } = require('../modules/certificates/certificates.routes');
const { profilesRouter } = require('../modules/profiles/profiles.routes');
const { learningRouter } = require('../modules/learning/learning.routes');
const { learnRouter } = require('../modules/learning/learningEngine.routes');
const { dataRouter } = require('../modules/data/data.routes');
const { adminRouter } = require('../modules/admin/admin.routes');
const { asyncHandler } = require('../utils/asyncHandler');
const { authRequired } = require('../middlewares/authMiddleware');
const { getActivities } = require('../utils/activityLogger');

function registerRoutes(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/courses', coursesRouter);
  app.use('/api/v1/enrollments', enrollmentsRouter);
  app.use('/api/v1/payments', paymentsRouter);
  app.use('/api/v1/certificates', certificatesRouter);
  app.use('/api/v1/profiles', profilesRouter);
  app.use('/api/v1/learning', learningRouter);
  app.use('/api/v1/learn', learnRouter);
  app.use('/api/v1/admin', adminRouter);
  // Legacy compatibility endpoint kept for transitional clients.
  app.use('/api/v1/data', dataRouter);

  // Activity feed
  app.get(
    '/api/v1/activity',
    authRequired,
    asyncHandler(async (req, res) => {
      const activities = await getActivities(req.user.userId, Number(req.query.limit) || 20);
      res.json({ success: true, data: activities });
    })
  );
}

module.exports = { registerRoutes };
