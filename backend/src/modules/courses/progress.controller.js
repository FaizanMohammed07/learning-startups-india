const coursesService = require('./courses.service');

exports.updateProgress = async (req, res) => {
  try {
    const { videoId, watchedSeconds, completed } = req.body;
    if (!videoId) return res.status(400).json({ error: 'Missing required fields' });
    // Call service logic
    await coursesService.updateProgress({ videoId, watchedSeconds, completed });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update progress' });
  }
};
