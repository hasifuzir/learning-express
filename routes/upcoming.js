const express = require('express');
const createError = require('http-errors');
const axios = require('axios');

const dateHelper = require('../helpers/dateHelper');

const router = express.Router();

//=====================================================================================================================
//Functions
//=====================================================================================================================
//Returns a RAWG list of games (max 40 games) from the past 12 months ordered by user parameter, defaults to popularity on RAWG website
/* Parameters: ordering , order of request to RAWG
    -added , most popular games on RAWG (how many users added it to their lists)
 */
const getReleasesPastYear = (ordering = 'released') => {
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

//Load data from RAWG and render page with all upcoming releases for the month
router.get('/', async (req, res, next) => {
    try {
        const month = dateHelper.getMonth();
        const response = await getReleasesPastYear();
        const releases = response.results;
        const number = releases.length;

        res.status(200);
        return res.render('upcoming', {
            title: `${month} releases`,
            dateHelper: dateHelper,
            totalNum: number,
            month: month,
            releasesAll: releases
        });
    }
    catch (err){
        res.status(400);

        return next(createError(400, err.message));
    }
});

//TO DO: MOVE THIS TO game.js and differentiate loading game details from JSON vs RAWG api
router.get('/:slug', function(req, res, next){
    try{
        getSpecificGame(req.params.slug)
            .then((response) => {
                //console.log(response.data);
                const gameDetails = response.data;

                res.status(200);
                return res.render('game', {
                    title: gameDetails.name,
                    dateHelper: dateHelper,
                    apiGame: true,
                    game: gameDetails
                });
            })
            .catch((err) => {
                console.log('Error!');
            });
    }
    catch(err) {
        res.status(400);

        return next(createError(400, err.message));
    }
});

module.exports = router;
