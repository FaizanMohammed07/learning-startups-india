const service = require('./users.service');

async function updateMe(req, res) {
  const user = await service.updateCurrentUser(req.user.userId, req.body);
  res.json({ success: true, data: { user } });
}

async function listUsersForAdmin(req, res) {
  const users = await service.listUsersForAdmin();
  res.json({ success: true, data: { users } });
}

module.exports = {
  updateMe,
  listUsersForAdmin,
};
