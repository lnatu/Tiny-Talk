const express = require('express');
const multer = require('multer');
const AuthController = require('./../api/controllers/AuthController');
const UserController = require('./../api/controllers/UsersController');

const upload = multer({ dest: 'src/assets/img/users' });

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.protect, AuthController.logout);
router.get('/activate/:token', AuthController.activateAccount);
router.patch('/updateMe', upload.single('photo'), UserController.updateMe);

module.exports = router;
