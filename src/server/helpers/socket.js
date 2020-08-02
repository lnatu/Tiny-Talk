const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const UserModel = require('./../api/models/UserModel');

class SocketHelper {
  constructor(io) {
    this.io = io;
  }

  addCookieParser(cookieParser) {
    this.io.use(cookieParser);
  }

  authentication() {
    this.io.use(async (socket, next) => {
      const token = socket.request.headers.cookie.jwt;
      if (token) {
        const decoded = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET
        );

        const currentUser = await UserModel.findById(decoded.id);

        if (!currentUser) {
          console.log('User not exists');
          return next(new AppError('User not exists', 401));
        }

        socket.request.user = currentUser;
        next();
      } else {
        console.log('Please log in to continue');
        return next(new AppError('Please log in to continue', 401));
      }
    });
  }

  connect() {
    const _this = this;
    this.io.on('connection', socket => {
      socket.on('friend-request-on', data => {
        const { id, fullName, avatar } = socket.request.user;
        const currentUser = {
          id,
          fullName,
          avatar
        };
        _this.io.sockets.emit('friend-request-on-response', currentUser);
      });

      socket.on('user-logout', () => {
        console.log('Disconnected');
        this.disconnect(socket);
      });
    });
  }

  disconnect(socket) {
    socket.disconnect();
  }
}

module.exports = SocketHelper;
