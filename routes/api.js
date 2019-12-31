const express = require('express');
const _ = require('lodash');
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

//Return all games based on specified platform ID as JSON
//Uses lodash, but you can also use filter() + inludes() instead!
/*
router.get('/platform/:id', function(req, res) {
  let gameList = _.filter(games.items, {"platformId" : [req.params.id]});

  return res.json(gameList);
});
 */

//Return all games based on specified platform ID as JSON
router.get('/platform/:id', function(req, res) {
  let gameList = games.items.filter(it => it.platformId.includes(req.params.id));

  return res.json(gameList);
});

module.exports = router;