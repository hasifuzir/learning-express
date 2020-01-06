const express = require('express');
const createError = require('http-errors');
const axios = require('axios');

const dateHelper = require('../helpers/dateHelper');
const schemas = require('../helpers/schemas');

//Middleware
const validator = require('../middleware/validator');
const stringToArray = require('../middleware/stringToArray');

const router = express.Router();

//Function to return a promise
//Creating function allows us to pass parameters to it, if necessary (not used now)
const getReleases = () => {
    try {
        const date = new Date();
        const dateYearAgo = new Date(date.setFullYear(date.getFullYear() -1 ));

        const url = 'https://api.rawg.io/api/games?dates=' + dateHelper.getDate(dateYearAgo) + ',' + dateHelper.getDate() + '&ordering=-added&page_size=40';

        console.log(url);

        return axios.get(url)
            .then(response => {
                    return response.data;
                })
    } catch(err) {
        console.log('Error!');
    }
};

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
        console.log('Error!');
    }
};

//Load data from RAWG and render page with all upcoming releases for the month
router.get('/', async (req, res, next) => {
    try {
        const month = dateHelper.getMonth();

        const response = await getReleases();
        const releases = response.results;
        const number = releases.length;

        res.status(200);
        return res.render('releases', {
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

//Custom
router.get('/filter', stringToArray(), validator(schemas.releasesSchema), async (req, res, next) => {
    try {
        let rating = req.query.rating;
        let platform = req.query.platform;

        let list = await getReleases();
        let gameList = list.results;

        if (rating != null){
            gameList = gameList.filter(it => (it.rating >= rating));
        }
        if (platform != null) {
            //Filters based on a SINGLE value
            //gameList = gameList.filter(it => it.platforms.some(it2 => it2.platform.slug === platform));
            gameList = gameList.filter(it => platform.every(it2 => it.platforms.some(it3 => it3.platform.slug === it2)));
            //Filters if include ANY
            //gameList = gameList.filter(it => it.platforms.every(it2 => platform.includes(it2.platform.slug)));

            //let favs = gameList.items.filter(it => profile.favs.includes(it.id));
        }

        const number = gameList.length;

        res.status(200);
        return res.render('releases', {
            title: `Releases`,
            dateHelper: dateHelper,
            totalNum: number,
            releasesAll: gameList
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
            game: response
        });
    }
    catch(err) {
        res.status(400);

        return next(createError(400, err.message));
    }
});

module.exports = router;
