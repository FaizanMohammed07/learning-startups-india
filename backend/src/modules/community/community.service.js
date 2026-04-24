const { Discussion, Group, GroupMember, Question, Answer } = require('./community.model');

class CommunityService {
  /**
   * Discussions
   */
  async getDiscussions(filters = {}) {
    return await Discussion.find({ parentId: null, ...filters })
      .populate('authorId', 'fullName avatarUrl')
      .sort({ isPinned: -1, createdAt: -1 });
  }

  async createDiscussion(data) {
    return await Discussion.create(data);
  }

  async getDiscussionDetails(id) {
    const thread = await Discussion.findById(id).populate('authorId', 'fullName avatarUrl');
    const replies = await Discussion.find({ parentId: id }).populate('authorId', 'fullName avatarUrl');
    return { ...thread._doc, replies };
  }

  /**
   * Groups
   */
  async getGroups() {
    return await Group.find().sort({ createdAt: -1 });
  }

  async createGroup(data, creatorId) {
    const group = await Group.create({ ...data, creatorId });
    await GroupMember.create({ groupId: group._id, userId: creatorId, role: 'admin' });
    return group;
  }

  async joinGroup(groupId, userId) {
    return await GroupMember.create({ groupId, userId });
  }

  /**
   * Q&A (Doubts)
   */
  async getQuestions() {
    return await Question.find().populate('authorId', 'fullName avatarUrl').sort({ createdAt: -1 });
  }

  async createQuestion(data) {
    return await Question.create(data);
  }

  async getQuestionDetails(id) {
    const question = await Question.findById(id).populate('authorId', 'fullName avatarUrl');
    const answers = await Answer.find({ questionId: id }).populate('authorId', 'fullName avatarUrl').sort({ votes: -1 });
    return { ...question._doc, answers };
  }

  async submitAnswer(data) {
    return await Answer.create(data);
  }

  async acceptAnswer(answerId, questionId, userId) {
    // Verify question ownership
    const question = await Question.findOne({ _id: questionId, authorId: userId });
    if (!question) throw new Error('Unauthorized or question not found');

    await Answer.updateMany({ questionId }, { isAccepted: false });
    const answer = await Answer.findByIdAndUpdate(answerId, { isAccepted: true }, { new: true });
    await Question.findByIdAndUpdate(questionId, { acceptedAnswerId: answerId });
    return answer;
  }
}

module.exports = new CommunityService();
