const NotificationModel = require('./../models/NotificationModel');
const catchError = require('./../../utils/catchError');

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
      notification
    }
  });
});

exports.deleteNotification = catchError(async (req, res, next) => {
  const { sender, receiver, type } = req.notificationObj;

  const deletedDoc = await NotificationModel.findOneAndDelete({
    $and: [{ sender }, { receiver }, { type }]
  }).select('_id');

  res.status(200).json({
    status: 'success',
    data: {
      deletedDoc
    }
  });
});

exports.getUserNotification = catchError(async (req, res, next) => {
  const notifications = await NotificationModel.find({
    receiver: req.user.id
  });

  res.status(200).json({
    status: 'success',
    data: {
      notifications
    }
  });
});
