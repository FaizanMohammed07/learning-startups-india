const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'error', 'announcement'],
      default: 'info',
    },
    target: {
      type: String,
      enum: ['all', 'users', 'mentors', 'investors', 'specific'],
      default: 'all',
    },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

notificationSchema.index({ isActive: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = { Notification };
