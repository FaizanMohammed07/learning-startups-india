const { Enrollment } = require('../modules/enrollments/enrollment.model');
const { ApiError } = require('../utils/apiError');

/**
 * Middleware that checks the user has an active enrollment for the course.
 * Must be placed AFTER authRequired. Expects :courseId in route params.
 */
function enrollmentRequired(req, res, next) {
  const courseId = req.params.courseId;
  if (!courseId) {
    return next(new ApiError(400, 'courseId param is required'));
  }

  Enrollment.findOne({ userId: req.user.userId, courseId })
    .lean()
    .then(enrollment => {
      if (!enrollment) {
        return next(new ApiError(403, 'You are not enrolled in this course'));
      }
      if (enrollment.status === 'cancelled' || enrollment.status === 'expired') {
        return next(new ApiError(403, 'Your enrollment is no longer active'));
      }
      req.enrollment = enrollment;
      return next();
    })
    .catch(err => next(err));
}

module.exports = { enrollmentRequired };
