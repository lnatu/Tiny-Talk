const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
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
    birthday: {
      type: Date,
      default: null
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
      required: [true, 'Please enter your password'],
      select: false
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
    website: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
      default: 'default-avatar.jpg'
    },
    role: {
      type: String,
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('fullName').get(function() {
  return `${this.lastName} ${this.firstName}`;
});

userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

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

userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
