/**
 * Activity Logger
 * Logs user activities to the Activity collection for dashboard display
 */
const mongoose = require('mongoose');

let Activity;
try {
  Activity = mongoose.model('Activity');
} catch {
  const schema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      type: { type: String, required: true },
      description: { type: String, default: '' },
      metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    { timestamps: true }
  );
  Activity = mongoose.model('Activity', schema);
}

async function logActivity(userId, type, description, metadata = {}) {
  try {
    await Activity.create({ userId, type, description, metadata });
  } catch {
    // Non-critical: don't let logging failures break the request
  }
}

async function getActivities(userId, limit = 20) {
  return Activity.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
}

module.exports = { logActivity, getActivities, Activity };
