const express = require('express');
const createError = require('http-errors');

const router = express.Router();

//Load FileSystem module for readFileSync
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    //Not using require() because any changes to JSON file are not reflected unless server is restarted
    let games = JSON.parse(fs.readFileSync('./public/json/manifest.json'));

    res.status(200);

    return res.render('index', {
      title: 'Home',
      total: games.items.length,
      gameArray: games.items
    });
  }
  catch (err){
    res.status(400);

    return next(createError(400, err.message));
  }
});

module.exports = router;
