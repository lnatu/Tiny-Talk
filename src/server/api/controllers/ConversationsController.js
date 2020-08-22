const ConversationModel = require('./../models/ConversationModel');
const MessageModel = require('./../models/MessageModel');
const catchError = require('./../../utils/catchError');

exports.getMyConversations = catchError(async (req, res, next) => {
  const conversations = await ConversationModel.find({
    participants: {
      $in: req.user.id
    }
  }).lean();

  for (const c of conversations) {
    c.messages = await MessageModel.find({ conversation: c._id }).select(
      'sender message type createdAt'
    );
  }

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
