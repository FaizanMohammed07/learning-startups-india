const coursesService = require('./courses.service');

exports.submitQuiz = async (req, res) => {
  try {
    const { responses } = req.body;
    if (!responses || !Array.isArray(responses))
      return res.status(400).json({ error: 'Missing required fields' });
    await coursesService.submitQuiz({ responses });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to submit quiz' });
  }
};
