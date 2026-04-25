const express = require('express');
const controller = require('./settings.controller');
const { authRequired } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authRequired, controller.getProfile);
router.patch('/profile', authRequired, controller.updateProfile);

router.patch('/account/password', authRequired, controller.updatePassword);
router.delete('/account', authRequired, controller.deleteAccount);

router.get('/notifications', authRequired, controller.getProfile); // Reusing getProfile as it contains prefs
router.patch('/notifications/preferences', authRequired, controller.updateNotifications);

router.get('/privacy', authRequired, controller.getProfile); // Reusing getProfile
router.patch('/privacy', authRequired, controller.updatePrivacy);

module.exports = { settingsRouter: router };
