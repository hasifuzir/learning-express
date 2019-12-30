//Creates JS vars and ties to certain packages, dependencies, node functionality and routes
//Node modules
const createError = require('http-errors'); //to create HTTP errors for Express
const express = require('express'); //use Express
const path = require('path'); //to work with file and directory paths
const logger = require('morgan'); //HTTP request logger middleware
const fs = require('fs'); //FileSystem module so we can load JSON files

//Load data
//manifest = require('./public/json/manifest.json'); //only runs once (use readFileSync instead)

//Routers
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const gameRouter = require('./routes/game');
const apiRouter = require('./routes/api');

const app = express(); //create an object of the Express module

//View engine setup
app.set('views', path.join(__dirname, 'views')); //views setting tells Express what directory to use for source of view template files
app.set('view engine', 'pug'); //Use pug as view engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //middleware function to specify path to serve static assets

//Tell Express to use routers
app.use('/', indexRouter); // Requests to / use the index router
app.use('/about', aboutRouter);
app.use('/game', gameRouter);
app.use('/api', apiRouter);

//Catch 404 and forward to error handler (How does 404 work?)
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

module.exports = app; //Core part of Node, which exports its app object