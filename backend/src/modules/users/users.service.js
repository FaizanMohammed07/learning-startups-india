const { User } = require('./user.model');
const { ApiError } = require('../../utils/apiError');

async function updateCurrentUser(userId, input) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');

  if (typeof input.full_name !== 'undefined') {
    user.fullName = input.full_name;
  }

  user.metadata = {
    emailNotifications: input.email_notifications ?? user.metadata?.emailNotifications,
    courseUpdates: input.course_updates ?? user.metadata?.courseUpdates,
    marketingEmails: input.marketing_emails ?? user.metadata?.marketingEmails,
  };

  await user.save();

  return {
    id: user._id,
    email: user.email,
    full_name: user.fullName,
    role: user.role,
    user_metadata: {
      full_name: user.fullName,
      email_notifications: user.metadata.emailNotifications,
      course_updates: user.metadata.courseUpdates,
      marketing_emails: user.metadata.marketingEmails,
    },
  };
}

async function listUsersForAdmin() {
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  return users.map(user => ({
    id: user._id,
    email: user.email,
    provider: 'email',
    emailConfirmed: true,
    emailConfirmedAt: user.createdAt,
    createdAt: user.createdAt,
    lastSignIn: user.updatedAt,
    phone: null,
    metadata: {
      full_name: user.fullName,
      role: user.role,
    },
  }));
}

module.exports = {
  updateCurrentUser,
  listUsersForAdmin,
};
