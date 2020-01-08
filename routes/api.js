const express = require('express');
const fs = require('fs');
const createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');
const schemas = require('../helpers/schemas');

//Middleware
const validator = require('../middleware/validator');

//Create router
const router = express.Router();

//Load the manifest JSON file
const games = require('../public/json/manifest.json');

//Returns all games and its details as JSON
router.get('/local/all', function(req, res) {
  try {
    res.status(200);


    return res.json(errorResponse.success(games.items));
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return list of IDs as JSON
router.get('/local/id_list', function(req, res, next) {
  try{
    //map() iterates through games.items array and returns an object array of corresponding key 'id'
    let gameIds = games.items.map(game => game.id);
    res.status(200);

    return res.json(errorResponse.success(gameIds));
  }
  catch(err){
    res.status(400);

    return next(createError(400, err.message));
  }
});

//Return specific game details (based on ID) as JSON
router.get('/local/:id', validator(schemas.gameSchema), (req, res, next) => {
  try{
    //find iterates through games.items and returns first object corresponding to parameter (TRUE)
    let game = games.items.find(it => it.id === req.params.id);

    if (game !== undefined) {
      res.status(200);

      return res.json(errorResponse.success(game));
    }
    else {
      res.status(400);
      return res.json(errorResponse.fail(400,'BAD_REQUEST', 'NOT_FOUND', 'Invalid game ID!'));
    }
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return all games based on specified platform ID as JSON
router.get('/local/platform/:id', validator(schemas.gameSchema), function(req, res, next) {
  try{
    //Explanation goes here
    let gameList = games.items.filter(it => it.platformId.includes(req.params.id));

    if (gameList && gameList.length) {
      res.status(200);

      return res.json(errorResponse.success(gameList));
    }
    else {
      res.status(400);

      return res.json(errorResponse.fail(400,'BAD_REQUEST', 'NOT_FOUND', 'Invalid platform ID!'));
    }
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return profile details as JSON
router.get('/profile', function(req, res, next) {
  try {
    const profile = JSON.parse(fs.readFileSync('./public/json/profile.json'));

    return res.json(errorResponse.success(profile));
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return profile details as JSON
router.get('/profile/wishlist', function(req, res, next) {
  try {
    const profile = JSON.parse(fs.readFileSync('./public/json/profile.json'));

    return res.json(errorResponse.success(profile.wishlist));
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Add a game to the user profile's wishlist
//wishName
router.post('/profile/wishlist', validator(schemas.wishListSchema), (req, res, next) => {
  try {
    const profile = JSON.parse(fs.readFileSync('./public/json/profile.json'));

    let newWish = req.body.wishName;

    profile.wishlist.forEach(id => {
      if (id.toLowerCase() === newWish.toLowerCase()){
        throw new Error('Wishlist game already exists!');
      }
    });

    profile.wishlist.push(newWish);

    let newProfile = JSON.stringify(profile);
    fs.writeFile('./public/json/profile.json', newProfile, 'utf8', function (err) {
      if (err) {
        throw err;
      } else {
        return res.json(errorResponse.success('New game successfully added to wishlist'));
      }
    });
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'DUPLICATE_ERROR', err.message));
  }
});

//Edit a game on the wishlist
//wishName
router.put('/profile/wishlist/:index', validator(schemas.indexSchema), (req, res, next) => {
  try {
    const profile = JSON.parse(fs.readFileSync('./public/json/profile.json'));
    const wishIndex = req.params.index;

    if (typeof profile.wishlist[wishIndex] === 'undefined'){
      throw  Error('Wishlist game does not exist!');
    }
    else {
      profile.wishlist[wishIndex] = req.body.wishName;
    }

    let newProfile = JSON.stringify(profile);
    fs.writeFile('./public/json/profile.json', newProfile, 'utf8', function (err) {
      if (err) {
        throw err;
      } else {
        return res.json(errorResponse.success('Wishlist game name successfully updated'));
      }
    });
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'INDEX_ERROR', err.message));
  }
});

//Delete a game on the wishlist
//wishName
router.delete('/profile/wishlist/:index', validator(schemas.indexSchema), (req, res, next) => {
  try {
    const profile = JSON.parse(fs.readFileSync('./public/json/profile.json'));
    const wishIndex = req.params.index;

    if (typeof profile.wishlist[wishIndex] === 'undefined'){
      throw  Error('Wishlist game does not exist!');
    }
    else {
      profile.wishlist.splice(wishIndex, 1);
    }

    let newProfile = JSON.stringify(profile);
    fs.writeFile('./public/json/profile.json', newProfile, 'utf8', function (err) {
      if (err) {
        throw err;
      } else {
        return res.json(errorResponse.success('Wishlist game successfully deleted'));
      }
    });
  }
  catch(err) {
    res.status(400);

    return res.json(errorResponse.fail(400, 'BAD_REQUEST', 'INDEX_ERROR', err.message));
  }
});

module.exports = router;