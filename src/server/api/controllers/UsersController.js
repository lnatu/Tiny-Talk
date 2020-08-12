const multer = require('multer');
const sharp = require('sharp');
const APIFeatures = require('./../../utils/apiFeatures');
const UserModel = require('./../models/UserModel');
const ContactModel = require('./../models/ContactModel');
const AppError = require('./../../utils/appError');
const catchError = require('./../../utils/catchError');
const factory = require('./../../helpers/factory');
const CONSTANTS = require('./../../config/constants');

/* const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/assets/img/users');
  },
  filename(req, file, cb) {
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${fileExtension}`);
  }
}); */

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
  const check = await checkBeforeAddContact(req.user.id, req.body.contactId);
  const contactExist = await UserModel.findById(req.body.contactId);

  if (!contactExist) {
    return next(new AppError('This contact is not found', 404));
  }

  if (!check) {
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
        $and: [{ userId: req.user.id }, { contactId: req.body.contactId }]
      },
      {
        $and: [{ userId: req.body.contactId }, { contactId: req.user.id }]
      }
    ]
  });

  req.notificationObj = {
    sender: req.user.id,
    receiver: req.body.contactId,
    type: CONSTANTS.NOTIFICATION_TYPES.ADD_CONTACT
  };

  await UserModel.updateMany(
    {
      _id: { $in: [req.user.id, req.body.contactId] }
    },
    { contact: null }
  );

  next();
});

exports.updateAccountInfo = factory.updateOne(UserModel);
exports.createUser = factory.createOne(UserModel);
exports.findByKeyword = factory.getAll(UserModel);
