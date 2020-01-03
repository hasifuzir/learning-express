const express = require('express');
const createError = require('http-errors');

const router = express.Router();

//const throwError = () => {throw new Error('You purposely threw this error!')};

//Render the About page
router.get('/', function(req, res, next) {
  try{
    //throwError();

    res.status(200);

    return res.render('about', {
      title: 'About'
    });
  }
  catch (err){
    res.status(400); //Is this not redundant due to next(createError(404))?

    return next(createError(err.status, err.message)); //Here I am specifying a 404 error, how do I get something like err.status?
  }
});

module.exports = router;
