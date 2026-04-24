const express = require('express');
const controller = require('./learningExperience.controller');
const { authRequired } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authRequired, controller.getProgress); 
router.get('/:id', authRequired, controller.getProgress); 
router.post('/:id/progress', authRequired, controller.recordProgress);
router.patch('/:id/bookmark', authRequired, controller.addBookmark);

module.exports = router;
