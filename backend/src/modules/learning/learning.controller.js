const { ApiError } = require('../../utils/apiError');
const service = require('./learning.service');

async function listQuizByVideo(req, res) {
  const videoId = req.query.videoId;
  if (!videoId) {
    throw new ApiError(400, 'videoId is required');
  }
  const { quizzes, responses } = await service.getQuizByVideo(req.user.userId, videoId);
  res.json({ success: true, quizzes, responses });
}

async function submitQuiz(req, res) {
  if (!Array.isArray(req.body.responses) || req.body.responses.length === 0) {
    throw new ApiError(400, 'responses must be a non-empty array');
  }
  const result = await service.submitQuizResponses(req.user.userId, req.body.responses);
  res.json({ success: true, ...result });
}

async function listProgress(req, res) {
  const progress = await service.getProgress(req.user.userId, req.query.videoId);
  res.json({ success: true, data: progress });
}

async function saveProgress(req, res) {
  if (!req.body.videoId) {
    throw new ApiError(400, 'videoId is required');
  }
  const progress = await service.upsertProgress(req.user.userId, req.body);
  res.json({ success: true, data: progress });
}

module.exports = {
  listQuizByVideo,
  submitQuiz,
  listProgress,
  saveProgress,
};
