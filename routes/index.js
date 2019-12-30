const express = require('express');
const router = express.Router();

//Load FileSystem module for readFileSync
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Not using require() because any changes to JSON file are not reflected unless server is restarted
  let games = JSON.parse(fs.readFileSync('./public/json/manifest.json'));

  return res.render('index', {
    title: 'Home',
    total: games.items.length,
    gameArray: games.items
  });
});

module.exports = router;
