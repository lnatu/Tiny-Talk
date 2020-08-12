const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'notification must has sender']
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'notification must has receiver']
  },
  type: {
    type: String,
    required: [true, 'notification type ?']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

notificationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'sender',
    select: '_id firstName lastName fullName avatar'
  });

  next();
});

const NotificationModel = mongoose.model('notification', notificationSchema);

module.exports = NotificationModel;
