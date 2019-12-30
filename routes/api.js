var express = require('express');
var router = express.Router();

const games = require('../public/json/manifest.json');

//Return all games
router.get('/all', function(req, res) {
  res.json(games.items);
});

//Return all IDs
//Why can't this be below?
router.get('/id_list', function(req, res) {
  for (let i = 0; i < games.items.length; i++) {
    let id = games.items[i].id;
    res.write(id + '\n');
  }
  res.end();
});

//Return specific game (based on ID)
router.get('/:id', function(req, res) {
  let game = games.items.find(it => it.id === req.params.id);
  res.json(game);
});

module.exports = router;
