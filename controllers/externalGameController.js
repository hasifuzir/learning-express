//Modules
const createError = require('http-errors');

//Models
const externalGames = require('../models/externalGames');

//Helpers
const dateHelper = require('../helpers/dateHelper');

//Load data from RAWG and render page of past year's games using getReleasesPastYear()
exports.displayReleases = async (req, res, next) => {
  try {
    const response = await externalGames.getReleasesPastYear();
    const releases = response.results;
    const number = releases.length;

    res.status(200);
    return res.render('releases', {
        title: `Releases`,
        date: dateHelper,
        totalNum: number,
        releasesAll: releases,
        adjective: 'top',
        rating: '0'
    });
  }
  catch (err){
    res.status(400);

    return next(createError(400, err.message));
  }
};

//Load data from RAWG, filter the results as per user parameters and render the page
exports.displayFilteredReleases = async (req, res, next) => {
  try {
    const minRating = req.query.min_rating;
    const platform = req.query.platform;

    const list = await externalGames.getReleasesPastYear();
    let gameList = list.results;

    if (minRating != null){
        gameList = gameList.filter(it => (it.rating >= minRating));
    }
    if (platform != null) {
        if (Array.isArray(platform)) {
            if (platform.some(it => it === 'all')){
                //Don't filter!
            }
            else{
                //Filters if include ANY
                //gameList = gameList.filter(it => it.platforms.every(it2 => platform.includes(it2.platform.slug)));

                gameList = gameList.filter(it => platform.every(it2 => it.platforms.some(it3 => it3.platform.slug === it2)));
            }
        }
        else if (platform === 'all'){
            //Don't filter!
        }
        else {
            //Filters based on a SINGLE value
            gameList = gameList.filter(it => it.platforms.some(it2 => it2.platform.slug === platform));
        }
    }

    const number = gameList.length;

    res.status(200);
    return res.render('releases', {
        title: `Releases`,
        date: dateHelper,
        totalNum: number,
        releasesAll: gameList,
        filter: true
    });
  }
  catch (err){
    res.status(400);

    return next(createError(400, err.message));
  }
};

//TO DO: differentiate loading game details from JSON vs RAWG api
exports.displaySpecificRelease = async (req, res, next) => {
  try{
    const game = await externalGames.getSpecificGame(req.params.slug);

    res.status(200);
    return res.render('game', {
        title: game.name,
        dateHelper: dateHelper,
        apiGame: true,
        game: game,
    });
  }
  catch(err) {
    res.status(400);

    return next(createError(400, err.message));
  }
};