const multer = require('multer');
const sharp = require('sharp');
const UserModel = require('./../models/UserModel');
const AppError = require('./../../utils/appError');
const catchError = require('./../../utils/catchError');
const factory = require('./../../helpers/factory');

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

exports.updateAccountInfo = factory.updateOne(UserModel);
exports.createUser = factory.createOne(UserModel);
