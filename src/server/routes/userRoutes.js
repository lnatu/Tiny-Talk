const express = require('express');
const UsersController = require('./../api/controllers/UsersController');

const router = express.Router();

router.route('/').post(UsersController.createUser);

module.exports = router;
