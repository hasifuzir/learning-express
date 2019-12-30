var express = require('express');
var router = express.Router();

const games = require('../public/json/manifest.json');

router.get('/:id', function(req, res) {
  //Use JS find() method, returns the array element value if any elements in the array match
  //tripe equals means to compare equal and of same type
  let game = games.items.find(it => it.id === req.params.id); //ECMAScript 2015 arrow function used here

  res.render('game', {
    title: game.name,
    game,
  });
});

module.exports = router;
