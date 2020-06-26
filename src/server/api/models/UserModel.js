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
    type: String,
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
      defalt: null
    },
    password: {
      type: String,
      defalt: null
    },
    isActive: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String,
      defalt: null
    }
  },
  facebook: {
    uid: {
      type: String,
      defalt: null
    },
    token: {
      type: String,
      defalt: null
    },
    email: {
      type: String,
      trim: true,
      defalt: null
    }
  },
  google: {
    uid: {
      type: String,
      defalt: null
    },
    token: {
      type: String,
      defalt: null
    },
    email: {
      type: String,
      trim: true
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
