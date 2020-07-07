const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserModel = require('./../models/UserModel');
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

  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(user, url).sendWelcome();
  console.log(user);

  token.createSendToken(user._id, 201, res);
});
