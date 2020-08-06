const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const UserModel = require('./../api/models/UserModel');
const socketHelper = require('./../helpers/socket');

class SocketService {
  constructor(io) {
    this.io = io;
    this.clients = {};
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
    this.io.on('connection', socket => {
      console.log('Socket connected');
      socketHelper.pushClientsSocketId(
        this.clients,
        socket.request.user.id,
        socket.id
      );

      socketHelper.openFriendRequest(
        this.io,
        socket,
        this.clients,
        'friend-request-on'
      );

      socketHelper.closeFriendRequest(
        this.io,
        socket,
        this.clients,
        'friend-request-off'
      );

      socket.on('disconnect', () => {
        socketHelper.clearClientsSocketId(
          this.clients,
          socket.request.user.id,
          socket.id
        );
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

module.exports = SocketService;
