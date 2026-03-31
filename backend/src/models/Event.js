const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    type: {
      type: String,
      enum: ['webinar', 'workshop', 'meetup', 'conference', 'other'],
      default: 'webinar',
    },
    date: { type: Date, required: true },
    endDate: { type: Date },
    venue: { type: String, trim: true, default: 'Online' },
    meetingLink: { type: String, trim: true },
    coverImage: { type: String, default: '' },
    maxAttendees: { type: Number, default: 0 },
    registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      enum: ['upcoming', 'live', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

eventSchema.index({ status: 1, date: -1 });

const Event = mongoose.model('Event', eventSchema);
module.exports = { Event };
