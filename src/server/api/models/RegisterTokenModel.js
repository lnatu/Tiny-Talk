const mongoose = require('mongoose');

const registerTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    default: null
  },
  tokenExpireAt: {
    type: Number,
    required: [true, 'Token must has expired date']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'Token must belong to a user']
  },
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

registerTokenSchema.pre(/^find/, function(next) {
  this.populate('user');

  next();
});

const RegisterTokenModel = mongoose.model('registerToken', registerTokenSchema);

module.exports = RegisterTokenModel;
