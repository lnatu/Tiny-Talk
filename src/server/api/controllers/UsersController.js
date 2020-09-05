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
 * @param user
 * @param contact
 * @returns {Promise<boolean>}
 */
const checkBeforeAddContact = async (user, contact) => {
  return !(await ContactModel.findOne({
    $or: [
      {
        $and: [{ user }, { contact }]
      },
      {
        $and: [{ user: contact }, { contact: user }]
      }
    ]
  }));
};

exports.addContact = catchError(async (req, res, next) => {
  const check = checkBeforeAddContact(req.user.id, req.body.contact);
  const contactExist = UserModel.findById(req.body.contact);

  const checks = await Promise.all([contactExist, check]);

  if (!checks[0]) {
    return next(new AppError('This contact is not found', 404));
  }

  if (!checks[1]) {
    return next(new AppError("You've requested this", 400));
  }

  const newContact = await ContactModel.create({
    user: req.user.id,
    contact: req.body.contact
  });

  req.notificationObj = {
    sender: req.user.id,
    receiver: req.body.contact,
    type: CONSTANTS.NOTIFICATION_TYPES.ADD_CONTACT
  };

  req.contact = newContact;

  next();
});

exports.cancelAddContact = catchError(async (req, res, next) => {
  await ContactModel.findOneAndDelete({
    $or: [
      {
        $and: [
          { user: req.user.id },
          { contact: req.body.contact },
          { status: false }
        ]
      },
      {
        $and: [
          { user: req.body.contact },
          { contact: req.user.id },
          { status: false }
        ]
      }
    ]
  });

  req.notificationObj = {
    sender: req.user.id,
    receiver: req.body.contact,
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
      item.user.equals(req.user.id) &&
      userObj[item.contact] &&
      !item.status
    ) {
      userObj[item.contact].friendRequest = { cancel: true };
    }

    if (
      item.contact.equals(req.user.id) &&
      userObj[item.user] &&
      !item.status
    ) {
      userObj[item.user].friendRequest = { wait: true };
    }

    if (item.user.equals(req.user.id) && userObj[item.contact] && item.status) {
      userObj[item.contact].friendRequest = { accept: true };
    }

    if (item.contact.equals(req.user.id) && userObj[item.user] && item.status) {
      userObj[item.user].friendRequest = { accept: true };
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
