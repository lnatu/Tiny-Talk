const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const UsersController = require('./../api/controllers/UsersController');

const router = express.Router();

router.post('/signup', AuthController.protect, AuthController.signup);

module.exports = router;
