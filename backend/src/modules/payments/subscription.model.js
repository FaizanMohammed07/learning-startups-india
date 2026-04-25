const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  planId: { type: String, required: true }, // e.g., 'incubator-pro', 'founder-elite'
  status: { type: String, enum: ['active', 'cancelled', 'expired', 'past_due'], default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  autoRenew: { type: Boolean, default: true },
  paymentIntentId: { type: String }, // Link to gateway subscription id
}, { timestamps: true });

module.exports = {
  Subscription: mongoose.model('Subscription', subscriptionSchema)
};
