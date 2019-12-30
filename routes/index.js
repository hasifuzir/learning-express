var express = require('express');
var router = express.Router();

const fs = require('fs');
const games = require('../public/json/manifest.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  let manifest = JSON.parse(fs.readFileSync('./public/json/manifest.json'));
  res.render('index', {
    title: 'Home',
    total: manifest.totalID,
    gameArray: manifest.items
  });
});

module.exports = router;
