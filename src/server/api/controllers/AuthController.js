const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserModel = require('./../models/UserModel');
const RegisterTokenModel = require('./../models/RegisterTokenModel');
const NotificationModel = require('./../models/NotificationModel');
const catchError = require('./../../utils/catchError');
const token = require('./../../helpers/token');
const AppError = require('./../../utils/appError');
const Email = require('./../../helpers/mailer');

exports.protect = catchError(async (req, res, next) => {
  // 1. Checking token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('Please log in to continue', 401));
  }

  // 2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currentUser = await UserModel.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('User not exists', 401));
  }

  // 4. Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please login again', 401)
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  // res.locals.user = currentUser;
  next();
});

exports.signup = catchError(async (req, res, next) => {
  const user = await UserModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  const verifyToken = await token.createVerifyToken(
    RegisterTokenModel,
    user._id
  );

  // const url = `${req.protocol}://${req.get('host')}/activate/${verifyToken}`;
  const url = `http://localhost:8080/account/activate/${verifyToken}`;
  // await new Email(user, url).sendWelcome();

  token.createSendToken({ user }, 201, res);
});

exports.login = catchError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await UserModel.findOne({ email }).select('+password');

  if (
    !user ||
    !user.isActive ||
    !(await user.comparePassword(password, user.password))
  ) {
    return next(new AppError('Email or password is not correct', 401));
  }

  const notifications = await NotificationModel.find({
    receiver: user.id
  }).limit(10);

  const userObj = {
    user,
    notifications
  };

  token.createSendToken(userObj, 200, res);
});

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' });
};

exports.activateAccount = catchError(async (req, res, next) => {
  // 1. Get user from token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const registerToken = await RegisterTokenModel.findOne({
    token: hashedToken,
    tokenExpireAt: { $gt: Date.now() }
  });

  // 2. Check for validity
  if (!registerToken) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // 3. Activate account and send token
  await UserModel.findByIdAndUpdate(registerToken.user._id, { isActive: true });

  token.createSendToken(registerToken, 201, res);
});

exports.updatePassword = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select('+password');

  if (!user) {
    return next(new AppError('User not found', 403));
  }

  if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is not correct', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  token.createSendToken({ user }, 200, res);
});
