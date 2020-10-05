const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'message must have sender']
  },
  conversation: {
    type: mongoose.Schema.ObjectId,
    ref: 'conversation',
    required: [true, 'message must belong to a conversation']
  },
  message: {
    type: String,
    trim: true
  },
  images: [String],
  seenBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    }
  ],
  type: {
    type: String,
    default: 'text',
    enum: {
      values: ['text', 'file', 'text n file'],
      message: 'Message type is either: text or file'
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

messageSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'sender',
    select: 'firstName lastName fullName avatar gender'
  });
  next();
});

const MessageModel = mongoose.model('message', messageSchema);

module.exports = MessageModel;
