const express = require('express');
const router = express.Router();

//load the manifest JSOn file
const games = require('../public/json/manifest.json');

//Returns game details page based on specific ID as parameter
router.get('/:id', function(req, res) {
  //Use JS find() method, returns the array element value if any elements in the array match
  let game = games.items.find(it => it.id === req.params.id);

  return res.render('game', {
    title: game.name,
    game,
  });
});

module.exports = router;
