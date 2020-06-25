const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User must has user name']
  },
  gender: {
    type: String,
    default: 'male'
  },
  phone: {
    type: Number,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: 'avatar-default.jpg'
  },
  role: {
    type: String,
    defalt: 'user'
  },
  local: {
    email: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: {
      type: String,
      trim: true,
      required: true
    }
  },
  google: {
    uid: String,
    token: String,
    email: {
      type: String,
      trim: true,
      required: true
    }
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

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
