const settingsService = require('./settings.service');
const { asyncHandler } = require('../../utils/asyncHandler');

exports.getProfile = asyncHandler(async (req, res) => {
  const data = await settingsService.getProfile(req.user.userId);
  res.json({ success: true, data });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const data = await settingsService.updateProfile(req.user.userId, req.body);
  res.json({ success: true, data });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  await settingsService.updatePassword(req.user.userId, req.body);
  res.json({ success: true, message: 'Password updated successfully' });
});

exports.updateNotifications = asyncHandler(async (req, res) => {
  const data = await settingsService.updateNotificationPrefs(req.user.userId, req.body);
  res.json({ success: true, data });
});

exports.updatePrivacy = asyncHandler(async (req, res) => {
  const data = await settingsService.updatePrivacySettings(req.user.userId, req.body);
  res.json({ success: true, data });
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  await settingsService.deleteAccount(req.user.userId);
  res.json({ success: true, message: 'Account deactivated' });
});
