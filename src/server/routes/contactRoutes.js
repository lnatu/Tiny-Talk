const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const ContactsController = require('./../api/controllers/ContactsController');
const NotificationsController = require('./../api/controllers/NotificationsController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/accept')
  .post(
    ContactsController.acceptFriendRequest,
    NotificationsController.updateNotificationType
  );

module.exports = router;
