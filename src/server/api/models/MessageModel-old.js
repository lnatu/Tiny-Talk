// const mongoose = require('mongoose');
//
// const messageSchema = new mongoose.Schema({
//   sender: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'user',
//     required: [true, 'message must have sender']
//   },
//   receiver: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'user',
//     required: [true, 'message must have receiver']
//   },
//   message: {
//     type: String,
//     required: [true, 'message text cant be empty']
//   },
//   file: {
//     data: Buffer,
//     contentType: String,
//     fileName: String
//   },
//   isRead: {
//     type: Boolean,
//     default: false
//   },
//   messageConversationType: {
//     type: String,
//     enum: {
//       values: ['private', 'group'],
//       message: 'Message conversation type is either: private or group'
//     }
//   },
//   messageType: {
//     type: String,
//     default: 'message',
//     enum: {
//       values: ['message', 'reply', 'forward'],
//       message: 'Message type is either: message, reply or forward'
//     }
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: null,
//     select: false
//   },
//   deletedAt: {
//     type: Date,
//     default: null,
//     select: false
//   }
// });
//
// const MessageModel = mongoose.model('message', messageSchema);
//
// module.exports = MessageModel;
