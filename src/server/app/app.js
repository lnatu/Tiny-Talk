const cors = require('cors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const apiEndpoints = require('./../config/apiEndpoints');
const AppError = require('./../utils/appError');
const errorHandler = require('./../helpers/handleError');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const allowlist = ['http://localhost:8080', 'http://192.168.1.9:8080'];
const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// App routes
const userRoutes = require('./../routes/userRoutes');
const fileRoutes = require('./../routes/fileRoutes');
const conversationRoutes = require('./../routes/conversationRoutes');

app.use(apiEndpoints.conversations, conversationRoutes);
app.use(apiEndpoints.files, fileRoutes);
app.use(apiEndpoints.users, userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

module.exports = app;
