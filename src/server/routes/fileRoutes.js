const express = require('express');
const FileController = require('./../api/controllers/FileController');
const AuthController = require('./../api/controllers/AuthController');

const router = express.Router();

router.use(AuthController.protect);

router.route('/downloadFile').get(FileController.downloadFile);

module.exports = router;
