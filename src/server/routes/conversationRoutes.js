const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const ConversationsController = require('./../api/controllers/ConversationsController');
const messagesRouter = require('./../routes/messageRoutes');

const router = express.Router();

router.use('/:conversationId/messages', messagesRouter);

router.use(AuthController.protect);

router.route('/').get(ConversationsController.getMyConversations);

module.exports = router;
