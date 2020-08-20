const ContactModel = require('./../models/ContactModel');
const APIFeatures = require('./../../utils/apiFeatures');
const CONSTANTS = require('./../../config/constants');
const catchError = require('./../../utils/catchError');

exports.acceptFriendRequest = catchError(async (req, res, next) => {
  await ContactModel.findOneAndUpdate(
    {
      $and: [{ contactId: req.user.id }, { userId: req.body.contactId }]
    },
    { status: true }
  );

  req.notificationObj = {
    sender: req.body.contactId,
    receiver: req.user.id,
    type: CONSTANTS.NOTIFICATION_TYPES.ADD_CONTACT
  };

  next();
});

exports.getMyContacts = catchError(async (req, res, next) => {
  const features = new APIFeatures(
    ContactModel.find({
      $or: [
        { $and: [{ userId: req.user.id, status: true }] },
        { $and: [{ contactId: req.user.id, status: true }] }
      ]
    })
      .populate({
        path: 'userId'
      })
      .populate({
        path: 'contactId'
      })
      .lean(),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const contacts = await features.query;

  contacts.forEach(contact => {
    if (contact.userId._id.equals(req.user.id)) {
      delete contact.userId;
      contact.contactId.fullName = `${contact.contactId.lastName} ${contact.contactId.firstName}`;
    }

    if (contact.contactId._id.equals(req.user.id)) {
      delete contact.contactId;
      contact.contactId = contact.userId;
      contact.contactId.fullName = `${contact.userId.lastName} ${contact.userId.firstName}`;
    }

    delete contact.userId;
  });

  res.status(200).json({
    message: 'success',
    data: {
      contacts
    }
  });
});
