const ConversationModel = require('./../models/ConversationModel');
const catchError = require('./../../utils/catchError');

exports.getMyConversations = catchError(async (req, res, next) => {
  const conversations = await ConversationModel.find({
    participants: {
      $in: req.user.id
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      conversations
    }
  });
});

exports.createConversation = catchError(async (req, res, next) => {
  const { sender, receiver } = req.notificationObj;

  const conversation = await ConversationModel.create({
    participants: [sender, receiver]
  });

  await conversation
    .populate({
      path: 'participants',
      select: '-__v -facebook -google'
    })
    .execPopulate();

  conversation.__v = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      conversation,
      contact: req.contact,
      updatedDoc: req.updatedDoc
    }
  });
});
