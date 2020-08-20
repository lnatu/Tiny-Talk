const multer = require('multer');
const sharp = require('sharp');
const UserModel = require('./../models/UserModel');
const ContactModel = require('./../models/ContactModel');
const AppError = require('./../../utils/appError');
const catchError = require('./../../utils/catchError');
const factory = require('./../../helpers/factory');
const CONSTANTS = require('./../../config/constants');

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

exports.resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  req.file.filename = `user-${req.user.id}-${Date.now()}.png`;

  sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('png')
    .toFile(`src/assets/img/users/${req.file.filename}`);

  next();
};
exports.uploadUserPhoto = upload.single('photo');

exports.updateAvatar = catchError(async (req, res, next) => {
  if (req.file) {
    req.body.avatar = req.file.filename;
  }

  const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

/**
 *
 * @param userId
 * @param contactId
 * @returns {Promise<*>}
 */
const checkBeforeAddContact = async (userId, contactId) => {
  return !(await ContactModel.findOne({
    $or: [
      {
        $and: [{ userId }, { contactId }]
      },
      {
        $and: [{ userId: contactId }, { contactId: userId }]
      }
    ]
  }));
};

exports.addContact = catchError(async (req, res, next) => {
  const check = checkBeforeAddContact(req.user.id, req.body.contactId);
  const contactExist = UserModel.findById(req.body.contactId);

  const checks = await Promise.all([contactExist, check]);

  if (!checks[0]) {
    return next(new AppError('This contact is not found', 404));
  }

  if (!checks[1]) {
    return next(new AppError("You've requested this", 400));
  }

  const contactCreatedResponse = await ContactModel.create({
    userId: req.user.id,
    contactId: req.body.contactId
  });

  await UserModel.updateMany(
    {
      _id: { $in: [req.user.id, req.body.contactId] }
    },
    { contact: contactCreatedResponse._id }
  );

  req.notificationObj = {
    sender: req.user.id,
    receiver: req.body.contactId,
    type: CONSTANTS.NOTIFICATION_TYPES.ADD_CONTACT
  };

  req.contact = contactCreatedResponse;

  next();
});

exports.cancelAddContact = catchError(async (req, res, next) => {
  await ContactModel.findOneAndDelete({
    $or: [
      {
        $and: [
          { userId: req.user.id },
          { contactId: req.body.contactId },
          { status: false }
        ]
      },
      {
        $and: [
          { userId: req.body.contactId },
          { contactId: req.user.id },
          { status: false }
        ]
      }
    ]
  });

  req.notificationObj = {
    sender: req.user.id,
    receiver: req.body.contactId,
    type: CONSTANTS.NOTIFICATION_TYPES.ADD_CONTACT
  };

  next();
});

exports.findContact = catchError(async (req, res, next) => {
  let searchObj = {};
  if (req.query.search) {
    const keyword = req.query.search;
    const regex = new RegExp(keyword, 'i');
    searchObj = {
      _id: { $nin: [req.user.id] },
      $text: { $search: regex }
    };
  }

  const users = await UserModel.find(searchObj).lean();
  const contacts = await ContactModel.find().lean();

  const userObj = {};
  users.forEach(item => {
    item.fullName = `${item.lastName} ${item.firstName}`;
    userObj[item._id] = item;
  });

  contacts.forEach(item => {
    if (
      item.userId.equals(req.user.id) &&
      userObj[item.contactId] &&
      !item.status
    ) {
      userObj[item.contactId].friendRequest = { cancel: true };
    }

    if (
      item.contactId.equals(req.user.id) &&
      userObj[item.userId] &&
      !item.status
    ) {
      userObj[item.userId].friendRequest = { wait: true };
    }

    if (
      item.userId.equals(req.user.id) &&
      userObj[item.contactId] &&
      item.status
    ) {
      userObj[item.contactId].friendRequest = { accept: true };
    }

    if (
      item.contactId.equals(req.user.id) &&
      userObj[item.userId] &&
      item.status
    ) {
      userObj[item.userId].friendRequest = { accept: true };
    }
  });

  // Send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      data: users
    }
  });
});

/* FACTORY */
exports.updateAccountInfo = factory.updateOne(UserModel);
exports.createUser = factory.createOne(UserModel);
exports.findByKeyword = factory.getAll(UserModel);
