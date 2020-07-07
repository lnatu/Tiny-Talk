const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please enter your first name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please enter your last name']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please enter your email']
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Please enter your password']
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
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  facebook: {
    uid: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    email: {
      type: String,
      trim: true,
      default: null
    }
  },
  passwordChangedAt: Date,
  google: {
    uid: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: null
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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
