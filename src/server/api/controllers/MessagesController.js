const ConversationModel = require('./../models/ConversationModel');
const MessageModel = require('./../models/MessageModel');
const AppError = require('./../../utils/appError');
const catchError = require('./../../utils/catchError');

exports.createMessage = catchError(async (req, res, next) => {
  const check = await ConversationModel.findOne({
    participants: {
      $in: req.user.id
    },
    _id: req.body.conversation
  });

  if (!check) {
    return next(new AppError("You're not belong to this conversation", 400));
  }

  req.body.sender = req.user.id;
  const message = await MessageModel.create(req.body);

  await message
    .populate({
      path: 'sender',
      select: 'firstName lastName fullName avatar gender'
    })
    .execPopulate();

  req.message = message;

  next();
});
