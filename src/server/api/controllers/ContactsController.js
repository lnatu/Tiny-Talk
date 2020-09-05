const ContactModel = require('./../models/ContactModel');
const APIFeatures = require('./../../utils/apiFeatures');
const CONSTANTS = require('./../../config/constants');
const catchError = require('./../../utils/catchError');

exports.acceptFriendRequest = catchError(async (req, res, next) => {
  const contact = await ContactModel.findOneAndUpdate(
    {
      $and: [{ contact: req.user.id }, { user: req.body.contact }]
    },
    { status: true, updatedAt: Date.now() },
    {
      new: true
    }
  );

  await contact
    .populate({
      path: 'contact'
    })
    .populate({
      path: 'user'
    })
    .execPopulate();

  contact.__v = undefined;

  req.notificationObj = {
    sender: req.body.contact,
    receiver: req.user.id,
    type: CONSTANTS.NOTIFICATION_TYPES.ADD_CONTACT
  };

  req.contact = contact;

  next();
});

exports.getMyContacts = catchError(async (req, res, next) => {
  const features = new APIFeatures(
    ContactModel.find({
      $or: [
        { $and: [{ user: req.user.id, status: true }] },
        { $and: [{ contact: req.user.id, status: true }] }
      ]
    })
      .populate({
        path: 'user'
      })
      .populate({
        path: 'contact'
      })
      .lean(),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const contacts = await features.query;

  contacts.forEach(contact => {
    if (contact.user._id.equals(req.user.id)) {
      delete contact.user;
      contact.contact.fullName = `${contact.contact.lastName} ${contact.contact.firstName}`;
    }

    if (contact.contact._id.equals(req.user.id)) {
      delete contact.contact;
      contact.contact = contact.user;
      contact.contact.fullName = `${contact.user.lastName} ${contact.user.firstName}`;
    }

    delete contact.user;
  });

  res.status(200).json({
    message: 'success',
    data: {
      contacts
    }
  });
});
