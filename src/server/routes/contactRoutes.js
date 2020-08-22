const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const ConversationsController = require('./../api/controllers/ConversationsController');
const ContactsController = require('./../api/controllers/ContactsController');
const NotificationsController = require('./../api/controllers/NotificationsController');

const router = express.Router();

router.use(AuthController.protect);

router.get('/', ContactsController.getMyContacts);

router
  .route('/accept')
  .post(
    ContactsController.acceptFriendRequest,
    NotificationsController.updateNotificationType,
    ConversationsController.createConversation
  );

module.exports = router;
