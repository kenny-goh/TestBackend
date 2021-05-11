const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const actuator = require('express-actuator');
const indexRouter = require('./routes');
const productsRouter = require('./routes/products');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
  basePath: '/management', // It will set /management/info instead of /info
  infoGitMode: 'simple', // the amount of git information you want to expose, 'simple' or 'full',
};
app.use(actuator(options));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler.
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
