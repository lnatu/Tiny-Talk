const express = require('express');
const AuthController = require('./../api/controllers/AuthController');
const UserController = require('./../api/controllers/UsersController');

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/activate/:token', AuthController.activateAccount);

router.use(AuthController.protect);

router.route('/').get(UserController.findByKeyword);

router.get('/logout', AuthController.logout);

router.post('/addContact', UserController.addContact);
router.delete('/cancelAddContact', UserController.cancelAddContact);

router.patch(
  '/updateAvatar',
  UserController.uploadUserPhoto,
  UserController.resizeImage,
  UserController.updateAvatar
);
router.patch('/updateAccountInfo', UserController.updateAccountInfo);
router.patch('/updatePassword', AuthController.updatePassword);

module.exports = router;
