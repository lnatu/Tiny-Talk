const ConversationModel = require('./../models/ConversationModel');
const NotificationModel = require('./../models/NotificationModel');
const APIFeatures = require('./../../utils/apiFeatures');
const catchError = require('./../../utils/catchError');
const CONSTANTS = require('./../../config/constants');

exports.createNotification = catchError(async (req, res, next) => {
  let notification = await NotificationModel.create(req.notificationObj);

  await notification
    .populate({
      path: 'sender',
      select: '_id firstName lastName fullName avatar'
    })
    .execPopulate();

  res.status(200).json({
    status: 'success',
    data: {
      notification,
      contact: req.contact
    }
  });
});

exports.deleteNotification = catchError(async (req, res, next) => {
  const { sender, receiver, type } = req.notificationObj;

  const deletedDoc = await NotificationModel.findOneAndDelete({
    $or: [
      {
        $and: [{ sender }, { receiver }, { type }]
      },
      {
        $and: [{ sender: receiver }, { receiver: sender }, { type }]
      }
    ]
  }).select('_id');

  res.status(200).json({
    status: 'success',
    data: {
      deletedDoc
    }
  });
});

exports.updateNotificationType = catchError(async (req, res, next) => {
  const { sender, receiver, type } = req.notificationObj;

  req.updatedDoc = await NotificationModel.findOneAndUpdate(
    {
      $and: [{ sender }, { receiver }, { type }]
    },
    { isRead: true, type: CONSTANTS.NOTIFICATION_TYPES.ACCEPT_CONTACT },
    {
      new: true
    }
  );

  next();
});

exports.getUserNotification = catchError(async (req, res, next) => {
  const features = new APIFeatures(
    NotificationModel.find({
      receiver: req.user.id
    }),
    req.query
  )
    .limitFields()
    .paginate();

  const notifications = await features.query;

  res.status(200).json({
    status: 'success',
    results: notifications.length,
    data: {
      notifications
    }
  });
});
