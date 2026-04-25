const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String }, // e.g., 'rocket', 'medal', 'flame'
  type: { type: String, enum: ['milestone', 'score', 'streak', 'course'], required: true },
  criteria: {
    metric: { type: String }, // 'completionPercentage', 'averageScore', 'streakDays'
    value: { type: Number }
  }
});

const userBadgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  badgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true, index: true },
  earnedAt: { type: Date, default: Date.now }
}, { timestamps: true });

userBadgeSchema.index({ userId: 1, badgeId: 1 }, { unique: true });

const Badge = mongoose.model('Badge', badgeSchema);
const UserBadge = mongoose.model('UserBadge', userBadgeSchema);

module.exports = {
  Badge,
  UserBadge
};
