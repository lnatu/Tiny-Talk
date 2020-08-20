const cookieParser = require('socket.io-cookie');
const socket = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SocketService = require('./services/SocketService');

process.on('uncaughtException', err => {
  console.log('Uncaught Exception! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app/app');

const DB = process.env.DATABASE_CONNECTION_STR.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const DB_LOCAL = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
const io = socket(server);
const sov = new SocketService(io);
sov.addCookieParser(cookieParser);
sov.authentication();
sov.connect();

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandler rejection! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
