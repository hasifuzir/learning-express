const express = require('express');
const createError = require('http-errors');
const axios = require('axios');

//Helpers
const dateHelper = require('../helpers/dateHelper');
const schemas = require('../helpers/schemas');

//Middleware
const validator = require('../middleware/validator');
const stringToArray = require('../middleware/stringToArray');

//Create a router
const router = express.Router();

//=====================================================================================================================
//Functions
//=====================================================================================================================
//Returns a RAWG list of games (max 40 games) from the past 12 months ordered by user parameter, defaults to popularity on RAWG website
/* Parameters: ordering , order of request to RAWG
    -added , most popular games on RAWG (how many users added it to their lists)
 */
const getReleasesPastYear = (ordering = '-added') => {
    try {
        const url = 'https://api.rawg.io/api/games?dates=' + dateHelper.getDateNoTime(dateHelper.dateYearAgo()) + ',' + dateHelper.getDateNoTime() + '&ordering=' + ordering + '&page_size=40';

        console.log(url);


        return axios.get(url)
            .then(response => {
                    return response.data;
                })
    } catch(err) {
        throw new Error(err.message);
    }
};

//Returns details of a specific game from RAWG based on game slug as user parameter
//Parameter: slug , game slug as per RAWG
const getSpecificGame = (slug) => {
    try{
        const url = 'https://api.rawg.io/api/games/' + slug;

        console.log(url);

        return axios.get(url)
            .then(response => {
                return response.data;
            })
    }
    catch(err){
        throw new Error(err.message);
    }
};

//=====================================================================================================================
//Routes
//=====================================================================================================================
//Load data from RAWG and render page of past year's games using getReleasesPastYear()
router.get('/', async (req, res, next) => {
    try {
        const response = await getReleasesPastYear();
        const releases = response.results;
        const number = releases.length;


        res.status(200);
        return res.render('releases', {
            title: `Releases`,
            dateHelper: dateHelper,
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
});

//Custom
router.get('/filter', validator(schemas.releasesSchema), async (req, res, next) => {
    try {
        console.log(req.query);

        let minRating = req.query.min_rating;
        let platform = req.query.platform;

        let list = await getReleasesPastYear();
        let gameList = list.results;

        if (minRating != null){
            gameList = gameList.filter(it => (it.rating >= minRating));
        }
        if (platform != null) {
            console.log(platform);

            if (Array.isArray(platform)) {
                if (platform.some(it => it === 'all')){

                }
                else{
                    gameList = gameList.filter(it => platform.every(it2 => it.platforms.some(it3 => it3.platform.slug === it2)));
                }
            }
            else if (platform === 'all'){

            }
            else {
                //Filters based on a SINGLE value
                gameList = gameList.filter(it => it.platforms.some(it2 => it2.platform.slug === platform));
            }
            //Filters if include ANY
            //gameList = gameList.filter(it => it.platforms.every(it2 => platform.includes(it2.platform.slug)));
        }

        const number = gameList.length;

        res.status(200);
        return res.render('releases', {
            title: `Releases`,
            dateHelper: dateHelper,
            totalNum: number,
            releasesAll: gameList,
            filter: true
        });
    }
    catch (err){
        res.status(400);

        return next(createError(400, err.message));
    }
});

//TO DO: MOVE THIS TO game.js and differentiate loading game details from JSON vs RAWG api
router.get('/:slug', async (req, res, next) => {
    try{
        const response = await getSpecificGame(req.params.slug);




        res.status(200);
        return res.render('game', {
            title: response.name,
            dateHelper: dateHelper,
            apiGame: true,
            game: response,
        });
    }
    catch(err) {
        res.status(400);

        return next(createError(400, err.message));
    }
});

module.exports = router;
