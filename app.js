// Creates JS vars and ties to certain packages, dependencies, node functionality and routes
// Node modules
const createError = require('http-errors'); //to create HTTP errors for Express
const express = require('express'); //use Express
const path = require('path'); //to work with file and directory paths
const logger = require('morgan'); //HTTP request logger middleware
//const fs = require('fs'); //FileSystem module so we can load JSON files
//const Joi = require('joi'); //for data validation
const bodyParser = require('body-parser');

// Routers
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const gameRouter = require('./routes/game');
const profileRouter = require('./routes/profile');
const apiRouter = require('./routes/api');
const settingsRouter = require('./routes/settings');
const upcomingRouter = require('./routes/upcoming');

const app = express(); //create an app object of the Express module

// View engine setup
app.set('views', path.join(__dirname, 'views')); //views setting tells Express what directory to use for source of view template files
app.set('view engine', 'pug'); //Use pug as view engine

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //middleware function to specify path to serve static assets
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/game', gameRouter);
app.use('/profile', profileRouter);
app.use('/api', apiRouter);
app.use('/settings', settingsRouter);
app.use('/upcoming', upcomingRouter);

// General route error handling fn(goes at the bottom of stack!)
// Catches anything that isn't defined by the routers and gives a 404 error, every time user makes request
app.use(function(req, res, next) {
  next(createError(404)); //pass to the error handling middleware fn below
});

// Error handling middleware fn
// Errors from routers are also sent here
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; //If env is development, err is blank

  // render the error page
  res.status(err.status || 500);
  return res.render('error');
});

module.exports = app; //Core part of Node, which exports its app object