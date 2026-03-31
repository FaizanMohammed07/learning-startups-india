const mentorsService = require('./mentors.service');

exports.sendWelcomeEmail = async (req, res) => {
  try {
    const { email, fullName, expertise } = req.body;
    await mentorsService.sendWelcomeEmail({ email, fullName, expertise });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to send welcome email' });
  }
};
