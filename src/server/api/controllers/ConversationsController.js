const ConversationModel = require('./../models/ConversationModel');
const MessageModel = require('./../models/MessageModel');
const APIFeatures = require('./../../utils/apiFeatures');
const catchError = require('./../../utils/catchError');

exports.getMyConversations = catchError(async (req, res, next) => {
  console.log(req.params);
  const features = new APIFeatures(
    ConversationModel.find({
      participants: {
        $in: req.user.id
      }
    }).lean(),
    req.query
  )
    .sort()
    .limitFields()
    .paginate()
    .limitFields();

  const conversations = await features.query;

  for (const c of conversations) {
    c.messages = await MessageModel.find({ conversation: c._id })
      .sort('-createdAt')
      .limit(20)
      .select('-__v');
    c.messages.sort((a, b) => a.createdAt - b.createdAt);
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

exports.updateConversationDate = catchError(async (req, res, next) => {
  const conversation = await ConversationModel.findByIdAndUpdate(
    {
      _id: req.body.conversation
    },
    {
      updatedAt: Date.now()
    },
    {
      new: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      conversation,
      message: req.message
    }
  });
});
