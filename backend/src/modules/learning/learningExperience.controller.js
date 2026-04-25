const learningService = require('./learningExperience.service');
const { asyncHandler } = require('../../utils/asyncHandler');

/**
 * Progress Controllers
 */
exports.getProgress = asyncHandler(async (req, res) => {
  const progress = await learningService.getUserProgress(req.user.userId, req.query.videoId);
  res.json({
    success: true,
    message: 'Progress retrieved successfully',
    data: progress
  });
});

exports.updateProgress = asyncHandler(async (req, res) => {
  const { videoId, watchedSeconds, completed } = req.body;
  const progress = await learningService.updateProgress(req.user.userId, videoId, {
    watchedSeconds,
    completed
  });
  res.json({
    success: true,
    message: 'Progress updated successfully',
    data: progress
  });
});

exports.getContinueLearning = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.userId;
  const data = await learningService.getContinueLearning(userId);
  res.json({
    success: true,
    message: 'Continue learning data retrieved',
    data: data || {}
  });
});

/**
 * Live Class Controllers
 */
exports.createLiveClass = asyncHandler(async (req, res) => {
  const liveClass = await learningService.createLiveClass({
    ...req.body,
    instructorId: req.user.userId
  });
  res.status(201).json({
    success: true,
    message: 'Live class scheduled successfully',
    data: liveClass
  });
});

exports.getLiveClasses = asyncHandler(async (req, res) => {
  const classes = await learningService.getLiveClasses(req.query);
  res.json({
    success: true,
    message: 'Live classes retrieved',
    data: classes
  });
});

exports.getLiveClassById = asyncHandler(async (req, res) => {
  const liveClass = await learningService.getLiveClassById(req.params.id);
  if (!liveClass) {
    return res.status(404).json({ success: false, message: 'Live class not found' });
  }
  res.json({
    success: true,
    data: liveClass
  });
});

exports.joinLiveClass = asyncHandler(async (req, res) => {
  const liveClass = await learningService.joinLiveClass(req.params.id, req.user.userId);
  res.json({
    success: true,
    message: 'Joined live class successfully',
    data: liveClass
  });
});

/**
 * Note Controllers
 */
exports.createNote = asyncHandler(async (req, res) => {
  const note = await learningService.createNote({
    ...req.body,
    userId: req.user.userId
  });
  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: note
  });
});

exports.getNotes = asyncHandler(async (req, res) => {
  const notes = await learningService.getNotes(req.user.userId, req.query);
  res.json({
    success: true,
    message: 'Notes retrieved',
    data: notes
  });
});

exports.updateNote = asyncHandler(async (req, res) => {
  const note = await learningService.updateNote(req.params.id, req.user.userId, req.body);
  res.json({
    success: true,
    message: 'Note updated',
    data: note
  });
});

exports.deleteNote = asyncHandler(async (req, res) => {
  await learningService.deleteNote(req.params.id, req.user.userId);
  res.json({
    success: true,
    message: 'Note deleted'
  });
});

/**
 * Recorded Class Specifics
 */
exports.recordProgress = asyncHandler(async (req, res) => {
  const { watchedSeconds, completed } = req.body;
  const progress = await learningService.updateProgress(req.user.userId, req.params.id, {
    watchedSeconds,
    completed
  });
  res.json({
    success: true,
    message: 'Progress recorded',
    data: progress
  });
});

exports.addBookmark = asyncHandler(async (req, res) => {
  const { timestamp, content } = req.body;
  const note = await learningService.createNote({
    userId: req.user.userId,
    videoId: req.params.id,
    timestamp,
    content: content || 'Bookmark'
  });
  res.json({
    success: true,
    message: 'Bookmark added',
    data: note
  });
});
