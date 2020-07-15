const UserModel = require('./../models/UserModel');
const catchError = require('./../../utils/catchError');
const factory = require('./../../helpers/factory');

exports.updateMe = catchError(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  res.status(200).json({
    message: 'ok'
  });
});

exports.createUser = factory.createOne(UserModel);
