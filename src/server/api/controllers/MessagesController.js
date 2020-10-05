const util = require('util');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const ConversationModel = require('./../models/ConversationModel');
const MessageModel = require('./../models/MessageModel');
const APIFeatures = require('./../../utils/apiFeatures');
const AppError = require('./../../utils/appError');
const catchError = require('./../../utils/catchError');
const storageUtil = require('./../../utils/storage');

const storage = multer.memoryStorage();

const filesStorage = new GridFsStorage({
  url: 'mongodb://localhost:27017/tiny-talk',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    req.fileUploaded = file.originalname;
    return {
      bucketName: 'messageFiles',
      filename: `${file.originalname}`
    };
  }
});

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

const filesUpload = multer({ storage: filesStorage }).single('file');

exports.uploadFiles = upload.array('images', 50);

exports.filesHandle = util.promisify(filesUpload);

exports.resizeImage = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  await new storageUtil().mkdirIfNotExists('img/messages');

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const fileName = `${uuidv4()}-mess-${Date.now()}.png`;

      const a = await sharp(file.buffer)
        .resize(500, null)
        .toFormat('png')
        .toFile(`src/server/public/img/messages/${fileName}`);

      req.body.images.push(
        `${req.protocol}://${req.get('host')}/img/messages/${fileName}`
      );
      return a;
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
  console.log(req.fileUploaded);
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
