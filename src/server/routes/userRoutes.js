const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const UserController = require('./../api/controllers/UsersController');

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/activate/:token', AuthController.activateAccount);

router.use(AuthController.protect);

router.get('/logout', AuthController.logout);
router.patch(
  '/updateAvatar',
  UserController.uploadUserPhoto,
  UserController.resizeImage,
  UserController.updateAvatar
);
router.patch('/updateAccountInfo', UserController.updateAccountInfo);

module.exports = router;
