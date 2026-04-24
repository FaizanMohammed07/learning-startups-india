const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', index: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  isPinned: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', default: null, index: true }, // For nested replies
  reactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['like', 'upvote', 'downvote'] }
  }]
}, { timestamps: true });

const groupSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  privacy: { type: String, enum: ['public', 'private'], default: 'public' },
  avatarUrl: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

const groupMemberSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  role: { type: String, enum: ['admin', 'moderator', 'member'], default: 'member' },
  status: { type: String, enum: ['active', 'pending', 'blocked'], default: 'active' }
}, { timestamps: true });

const questionSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  acceptedAnswerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null },
  votes: { type: Number, default: 0 }
}, { timestamps: true });

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  isAccepted: { type: Boolean, default: false },
  votes: { type: Number, default: 0 }
}, { timestamps: true });

groupMemberSchema.index({ groupId: 1, userId: 1 }, { unique: true });

module.exports = {
  Discussion: mongoose.model('Discussion', discussionSchema),
  Group: mongoose.model('Group', groupSchema),
  GroupMember: mongoose.model('GroupMember', groupMemberSchema),
  Question: mongoose.model('Question', questionSchema),
  Answer: mongoose.model('Answer', answerSchema)
};
