var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');

var orderRoute = require('./routes/orderRoute');

//Set up connectivity to MongoDB
const mongoUrl = 'mongodb://localhost:27017/orders';
mongoose.connect(mongoUrl, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
});

//Clean up the connection when cntrl+c is pressed
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log("Closing the mongodb connection");
    process.exit(0);
  });
});

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//change default port from 3000 to 8080
app.set('port', process.env.PORT || 8080);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', orderRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//set port
app.listen(app.get('port'));

module.exports = app;
