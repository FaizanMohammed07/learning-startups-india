const { User } = require('../users/user.model');
const bcrypt = require('bcryptjs');

class SettingsService {
  async getProfile(userId) {
    return await User.findById(userId).select('-passwordHash -refreshTokenHash');
  }

  async updateProfile(userId, data) {
    return await User.findByIdAndUpdate(userId, { $set: data }, { new: true }).select('-passwordHash -refreshTokenHash');
  }

  async updatePassword(userId, { currentPassword, newPassword }) {
    const user = await User.findById(userId);
    if (!user || !user.passwordHash) throw new Error('Password not set for this account');

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) throw new Error('Incorrect current password');

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();
    return true;
  }

  async updateNotificationPrefs(userId, prefs) {
    return await User.findByIdAndUpdate(userId, { $set: { notificationPrefs: prefs } }, { new: true });
  }

  async updatePrivacySettings(userId, settings) {
    return await User.findByIdAndUpdate(userId, { $set: { privacySettings: settings } }, { new: true });
  }

  async deleteAccount(userId) {
    return await User.findByIdAndUpdate(userId, { $set: { isActive: false } });
  }
}

module.exports = new SettingsService();
