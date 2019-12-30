const express = require('express');
const router = express.Router();

//Load the manifest JSON file
const games = require('../public/json/manifest.json');

//Returns all games and its details as JSON
router.get('/all', function(req, res) {
  return res.json(games.items);
});

//Return list of IDs as JSON
router.get('/id_list', function(req, res) {
  //map() iterates through games.items array and returns an object array of corresponding key 'id'
  const gameIds = games.items.map(game => game.id);

  return res.json(gameIds)
});

//Return specific game details (based on ID) as JSON
router.get('/game/:id', function(req, res) {
  //find iterates through games.items and returns first object corresponding to parameter (TRUE)
  let game = games.items.find(it => it.id === req.params.id);

  return res.json(game);
});

module.exports = router;
