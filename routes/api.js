const express = require('express');
const fs = require('fs');
//const _ = require('lodash');
const createError = require('http-errors');

const apiResponse = require('../helpers/apiResponse');
const schemas = require('../helpers/schemas');

//Middleware
const schemaValidator = require('../middleware/SchemaValidator');

const router = express.Router();

//Load the manifest JSON file
const games = require('../public/json/manifest.json');

//Returns all games and its details as JSON
router.get('/all', function(req, res, next) {
  try {
    res.status(200);


    return res.json(apiResponse.success(games.items));
  }
  catch(err) {
    res.status(400);

    return res.json(apiResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return list of IDs as JSON
router.get('/id_list', function(req, res, next) {
  try{
    //map() iterates through games.items array and returns an object array of corresponding key 'id'
    let gameIds = games.items.map(game => game.id);
    res.status(200);

    return res.json(apiResponse.success(gameIds));
  }
  catch(err){
    res.status(400);

    return next(createError(400, err.message));
  }
});

//Return specific game details (based on ID) as JSON
router.get('/game/:id', schemaValidator.paramsId(schemas.idSchema), (req, res, next) => {
  try{
    //find iterates through games.items and returns first object corresponding to parameter (TRUE)
    let game = games.items.find(it => it.id === req.params.id);

    if (game !== undefined) {
      res.status(200);

      return res.json(apiResponse.success(game));
    }
    else {
      res.status(400);
      return res.json(apiResponse.fail(400,'BAD_REQUEST', 'NOT_FOUND', 'Invalid game ID!'));
    }
  }
  catch(err) {
    res.status(400);

    return res.json(apiResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return all games based on specified platform ID as JSON
router.get('/platform/:id', schemaValidator.paramsId(schemas.idSchema), function(req, res, next) {
  try{
    //Explanation goes here
    let gameList = games.items.filter(it => it.platformId.includes(req.params.id));

    if (gameList && gameList.length) {
      res.status(200);

      return res.json(apiResponse.success(gameList));
    }
    else {
      res.status(400);

      return res.json(apiResponse.fail(400,'BAD_REQUEST', 'NOT_FOUND', 'Invalid platform ID!'));
    }
  }
  catch(err) {
    res.status(400);

    return res.json(apiResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return profile details as JSON
router.get('/profile', function(req, res, next) {
  try {
    const profile = JSON.parse(fs.readFileSync('./public/json/profile.json'));

    return res.json(apiResponse.success(profile));
  }
  catch(err) {
    res.status(400);

    return res.json(apiResponse.fail(400, 'BAD_REQUEST', 'UNKNOWN_ERROR', 'API has returned an error!'));
  }
});

//Return all games based on specified platform ID as JSON
//Uses lodash, but you can also use filter() + inludes() instead!
/*
router.get('/platform/:id', function(req, res) {
  let gameList = _.filter(games.items, {"platformId" : [req.params.id]});

  return res.json(gameList);
});
 */


module.exports = router;