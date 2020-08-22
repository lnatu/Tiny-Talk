const MessageModel = require('./../models/MessageModel');
const catchError = require('./../../utils/catchError');

exports.createMessage = catchError(async (req, res, next) => {
  const message = await MessageModel.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      message
    }
  });
});
