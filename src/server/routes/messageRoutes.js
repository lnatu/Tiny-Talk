const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const MessagesController = require('./../api/controllers/MessagesController');
const ConversationsController = require('./../api/controllers/ConversationsController');

const router = express.Router({ mergeParams: true });

router.use(AuthController.protect);

router
  .route('/')
  .get(MessagesController.getConversationMessages)
  .post(
    MessagesController.uploadImages,
    MessagesController.resizeImage,
    MessagesController.createMessage,
    ConversationsController.updateConversationDate
  );

module.exports = router;
