const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'message must has sender']
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'message must has receiver']
  },
  text: {
    type: String,
    required: [true, 'message text cant be empty']
  },
  file: {
    data: Buffer,
    contentType: String,
    fileName: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
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

const MessageModel = mongoose.model('message', messageSchema);

module.exports = MessageModel;
