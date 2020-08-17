const ContactModel = require('./../models/ContactModel');
const catchError = require('./../../utils/catchError');
const CONSTANTS = require('./../../config/constants');

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
