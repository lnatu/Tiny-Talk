const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const UserController = require('./../api/controllers/UsersController');
const NotificationsController = require('./../api/controllers/NotificationsController');

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/activate/:token', AuthController.activateAccount);

router.use(AuthController.protect);

router.route('/').get(UserController.findByKeyword);

router.get('/logout', AuthController.logout);
router.get('/notifications', NotificationsController.getUserNotification);

router.post(
  '/addContact',
  UserController.addContact,
  NotificationsController.createNotification
);
router.delete(
  '/cancelAddContact',
  UserController.cancelAddContact,
  NotificationsController.deleteNotification
);

router.patch(
  '/updateAvatar',
  UserController.uploadUserPhoto,
  UserController.resizeImage,
  UserController.updateAvatar
);
router.patch('/updateAccountInfo', UserController.updateAccountInfo);
router.patch('/updatePassword', AuthController.updatePassword);

module.exports = router;
