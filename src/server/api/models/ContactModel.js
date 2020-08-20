const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'contact must has user id']
  },
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'contact must have a reference']
  },
  status: {
    type: Boolean,
    default: false
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

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = ContactModel;
