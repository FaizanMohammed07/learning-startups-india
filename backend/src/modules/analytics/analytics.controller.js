const analyticsService = require('./analytics.service');
const { asyncHandler } = require('../../utils/asyncHandler');

exports.getProgressOverview = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.userId;
  
  // Security check: Non-admins can only see their own analytics
  if (req.user.role !== 'admin' && userId !== req.user.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized access' });
  }

  const data = await analyticsService.getProgressOverview(userId);
  res.json({
    success: true,
    data
  });
});

exports.getPerformanceAnalytics = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.userId;
  
  if (req.user.role !== 'admin' && userId !== req.user.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized access' });
  }

  const data = await analyticsService.getPerformanceAnalytics(userId);
  res.json({
    success: true,
    data
  });
});

exports.getLearningTime = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.userId;
  
  if (req.user.role !== 'admin' && userId !== req.user.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized access' });
  }

  const data = await analyticsService.getLearningTime(userId);
  res.json({
    success: true,
    data
  });
});

exports.getSkillGraph = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.userId;
  
  if (req.user.role !== 'admin' && userId !== req.user.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized access' });
  }

  const data = await analyticsService.getSkillGraph(userId);
  res.json({
    success: true,
    data
  });
});
