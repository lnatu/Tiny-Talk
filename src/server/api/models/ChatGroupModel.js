const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Tiny chat group'
  },
  userAmount: {
    type: Number,
    min: [3, 'chat group must has more than 2 people']
  },
  messageAmount: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'chat group must has some user']
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
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

const ChatGroupModel = mongoose.model('chatgroup', chatGroupSchema);

module.exports = ChatGroupModel;
