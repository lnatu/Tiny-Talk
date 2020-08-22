const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    }
  ],
  type: {
    type: String,
    default: 'private',
    enum: {
      values: ['private', 'group'],
      message: 'Conversation type is either: private or group'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null,
    select: false
  },
  deletedAt: {
    type: Date,
    default: null,
    select: false
  }
});

conversationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'participants',
    select: '-__v -facebook -google'
  });
  next();
});

const conversationModel = mongoose.model('conversation', conversationSchema);

module.exports = conversationModel;
