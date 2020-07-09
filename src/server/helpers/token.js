const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

/* eslint-disable */
exports.createVerifyToken = async (TokenModel, userId) => {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenExpireAt = Date.now() + 10 * 60 * 1000;

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  await TokenModel.create({
    token: hashedToken,
    tokenExpireAt,
    user: userId
  });

  return token;
};

exports.createSendToken = (signature, statusCode, res) => {
  const token = signToken(signature);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  const env = process.env.NODE_ENV.trim();

  if (env === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token
  });
};
