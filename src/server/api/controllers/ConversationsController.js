const ConversationModel = require('./../models/ConversationModel');
const MessageModel = require('./../models/MessageModel');
const APIFeatures = require('./../../utils/apiFeatures');
const catchError = require('./../../utils/catchError');

exports.getMyConversations = catchError(async (req, res, next) => {
  const features = new APIFeatures(
    ConversationModel.find({
      participants: {
        $in: req.user.id
      }
    }).populate({
      path: 'messages'
    }),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const conversations = await features.query;

  res.status(200).json({
    status: 'success',
    results: conversations.length,
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
    .populate({
      path: 'messages'
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
