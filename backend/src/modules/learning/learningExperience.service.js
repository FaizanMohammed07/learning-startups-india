const { Progress, LiveClass, Note, Video } = require('./learning.model');
const { Lesson } = require('../courses/course.model');

/**
 * Progress Services
 */
async function getUserProgress(userId, videoId) {
  const query = { userId };
  if (videoId) query.videoId = videoId;
  return Progress.find(query).lean();
}

async function updateProgress(userId, videoId, data) {
  return Progress.findOneAndUpdate(
    { userId, videoId },
    { $set: { ...data, updatedAt: new Date() } },
    { upsert: true, new: true }
  ).lean();
}

async function getContinueLearning(userId) {
  // Find last updated progress
  const lastProgress = await Progress.findOne({ userId })
    .sort({ updatedAt: -1 })
    .populate('videoId')
    .lean();
  
  if (!lastProgress) return null;

  // Find next lesson/video if current is completed
  if (lastProgress.completed && lastProgress.videoId) {
    const nextVideo = await Video.findOne({
      courseId: lastProgress.videoId.courseId,
      orderIndex: { $gt: lastProgress.videoId.orderIndex }
    }).sort({ orderIndex: 1 }).lean();
    
    return { current: lastProgress, next: nextVideo };
  }

  return { current: lastProgress, next: null };
}

/**
 * Live Class Services
 */
async function createLiveClass(data) {
  return LiveClass.create(data);
}

async function getLiveClasses(filters = {}) {
  return LiveClass.find(filters).sort({ startTime: 1 }).lean();
}

async function getLiveClassById(id) {
  return LiveClass.findById(id).populate('courseId instructorId').lean();
}

async function joinLiveClass(id, userId) {
  return LiveClass.findByIdAndUpdate(
    id,
    { $addToSet: { attendees: { userId, joinedAt: new Date() } } },
    { new: true }
  ).lean();
}

/**
 * Note Services
 */
async function createNote(data) {
  return Note.create(data);
}

async function getNotes(userId, filters = {}) {
  return Note.find({ userId, ...filters }).sort({ timestamp: 1 }).lean();
}

async function updateNote(id, userId, data) {
  return Note.findOneAndUpdate({ _id: id, userId }, { $set: data }, { new: true }).lean();
}

async function deleteNote(id, userId) {
  return Note.findOneAndDelete({ _id: id, userId }).lean();
}

module.exports = {
  getUserProgress,
  updateProgress,
  getContinueLearning,
  createLiveClass,
  getLiveClasses,
  getLiveClassById,
  joinLiveClass,
  createNote,
  getNotes,
  updateNote,
  deleteNote
};
