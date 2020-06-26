const express = require('express');
const morgan = require('morgan');
const apiEndpoints = require('./../config/apiEndpoints');
const AppError = require('./../utils/appError');
const errorHandler = require('./../helpers/handleError');

const app = express();

// Body parser
app.use(express.json({ limit: '10kb' }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// App routes
const userRoutes = require('./../routes/userRoutes');

app.use(apiEndpoints.users, userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

module.exports = app;
