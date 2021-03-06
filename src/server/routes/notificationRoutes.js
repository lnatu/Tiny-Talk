const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const NotificationsController = require('./../api/controllers/NotificationsController');

const router = express.Router();

router.use(AuthController.protect);

router.route('/').get(NotificationsController.getUserNotification);

module.exports = router;
