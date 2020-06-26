const UserModel = require('./../models/UserModel');
const factory = require('./../../helpers/factory');

exports.createUser = factory.createOne(UserModel);
