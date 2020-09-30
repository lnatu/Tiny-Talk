const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const ConversationModel = require('./../models/ConversationModel');
const MessageModel = require('./../models/MessageModel');
const APIFeatures = require('./../../utils/apiFeatures');
const AppError = require('./../../utils/appError');
const catchError = require('./../../utils/catchError');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

exports.uploadFiles = upload.array('images', 10);

exports.resizeImage = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  req.body.files = [];

  await Promise.all(
    req.files.map(async file => {
      const fileName = `${uuidv4()}-mess-${Date.now()}.png`;

      await sharp(file.buffer)
        .resize(500, null)
        .toFormat('png')
        .toFile(`src/assets/img/messages/${fileName}`);

      req.body.files.push(fileName);
    })
  );

  next();
};

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

exports.getConversationMessages = catchError(async (req, res, next) => {
  const features = new APIFeatures(
    MessageModel.find({
      conversation: req.params.conversationId
    }),
    req.query
  )
    .sort()
    .limitFields()
    .paginate()
    .limitFields();

  let messages = await features.query;

  messages = messages.sort((a, b) => a.createdAt - b.createdAt);

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages
    }
  });
});
