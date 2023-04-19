const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tour');
const userRouter = require('./routes/user');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 404 handler
app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
