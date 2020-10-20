const multer = require('multer');
const path = require('path');
const gridFSStorage = require('multer-gridfs-storage');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const ConversationModel = require('./../models/ConversationModel');
const MessageModel = require('./../models/MessageModel');
const APIFeatures = require('./../../utils/apiFeatures');
const AppError = require('./../../utils/appError');
const catchError = require('./../../utils/catchError');
const storageUtil = require('./../../utils/storage');

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

exports.uploadFiles = upload.array('images', 50);

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

const testStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/files'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    req.body.files = [
      {
        id: `http://localhost:8080/api/v1/files/downloadFile?fileId=${uniqueName}`,
        name: file.originalname,
        url: `${req.protocol}://${req.get('host')}/img/files/${uniqueName}`
      }
    ];
    cb(null, uniqueName);
  }
});
const testUploads = multer({ storage: testStorage });
exports.testUpload = testUploads.single('file');

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
