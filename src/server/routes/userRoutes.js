const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const UserController = require('./../api/controllers/UsersController');
const NotificationsController = require('./../api/controllers/NotificationsController');
const notificationsRouter = require('./../routes/notificationRoutes');
const contactsRouter = require('./../routes/contactRoutes');

const router = express.Router();

router.use('/notifications', notificationsRouter);
router.use('/contacts', contactsRouter);

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/activate/:token', AuthController.activateAccount);

router.use(AuthController.protect);

router.route('/').get(UserController.findContact);
router.route('/findContact').get(UserController.findContact);

router.get('/logout', AuthController.logout);

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
