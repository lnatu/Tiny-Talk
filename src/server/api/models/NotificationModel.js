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
  content: {
    type: String,
    required: [true, 'notification content ?']
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

const NotificationModel = mongoose.model('notification', notificationSchema);

module.exports = NotificationModel;
