const express = require('express');
const createError = require('http-errors');

const router = express.Router();

//load the manifest JSON file
const games = require('../public/json/manifest.json');

//Returns game details page based on specific ID as parameter
router.get('/:id', function(req, res, next) {
  try {
    //Use JS find() method, returns the array element value if any elements in the array match
    let game = games.items.find(it => it.id === req.params.id);

    if (game !== undefined) {
      res.status(200);

      return res.render('game', {
        apiGame: false,
        title: game.name,
        game,
      });
    }
    else {
      res.status(400);

      return next(createError(400, 'Invalid game ID'));
    }
  }
  catch (err){
    res.status(400);

    return next(createError(400, err.message));
  }
});

module.exports = router;
