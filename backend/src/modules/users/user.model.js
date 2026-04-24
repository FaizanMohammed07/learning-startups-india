const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, default: null },
    fullName: { type: String, trim: true },
    avatarUrl: { type: String, trim: true },
    provider: { type: String, enum: ['email', 'google', 'facebook'], default: 'email' },
    providerIds: {
      google: { type: String },
      facebook: { type: String },
    },
    authProviders: { type: [String], default: ['email'] },
    role: { type: String, enum: ['admin', 'user', 'mentor', 'investor'], default: 'user' },
    metadata: {
      emailNotifications: { type: Boolean, default: true },
      courseUpdates: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    refreshTokenHash: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, createdAt: -1 });
userSchema.index({ 'providerIds.google': 1 }, { sparse: true, unique: true });
userSchema.index({ 'providerIds.facebook': 1 }, { sparse: true, unique: true });

const User = mongoose.model('User', userSchema);
module.exports = { User };
