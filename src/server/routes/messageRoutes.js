const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const MessagesController = require('./../api/controllers/MessagesController');

const router = express.Router();

router.use(AuthController.protect);

router.route('/').post(MessagesController.createMessage);

module.exports = router;
