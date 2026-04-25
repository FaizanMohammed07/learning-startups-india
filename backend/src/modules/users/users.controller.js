const service = require('./users.service');

async function updateMe(req, res) {
  const user = await service.updateCurrentUser(req.user.userId, req.body);
  res.json({ success: true, data: { user } });
}

async function listUsersForAdmin(req, res) {
  const users = await service.listUsersForAdmin();
  res.json({ success: true, data: { users } });
}

async function getWishlist(req, res) {
  const coursesService = require('../courses/courses.service');
  const wishlist = await coursesService.getUserWishlist(req.user.userId);
  res.json({ success: true, message: 'Wishlist fetched successfully', data: wishlist });
}

module.exports = {
  updateMe,
  listUsersForAdmin,
  getWishlist,
};
