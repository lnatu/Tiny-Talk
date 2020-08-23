const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const MessagesController = require('./../api/controllers/MessagesController');
const ConversationsController = require('./../api/controllers/ConversationsController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .post(
    MessagesController.createMessage,
    ConversationsController.updateConversationDate
  );

module.exports = router;
