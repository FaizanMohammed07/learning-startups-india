const express = require('express');
const controller = require('./learningExperience.controller');
const { authRequired } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authRequired, controller.getNotes);
router.post('/', authRequired, controller.createNote);
router.get('/:id', authRequired, controller.getNotes); // Filtered by ID
router.patch('/:id', authRequired, controller.updateNote);
router.delete('/:id', authRequired, controller.deleteNote);

module.exports = router;
