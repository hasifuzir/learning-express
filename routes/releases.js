const express = require('express');
const createError = require('http-errors');
const axios = require('axios');

const dateHelper = require('../helpers/dateHelper');
const schemas = require('../helpers/schemas');

//Middleware
const validator = require('../middleware/validator');

const router = express.Router();

//Function to return a promise
//Creating function allows us to pass parameters to it, if necessary (not used now)
const getReleases = () => {
    try {
        const date = new Date();

        const dateYearAgo = new Date(date.setFullYear(date.getFullYear() -1 ));

        let url = 'https://api.rawg.io/api/games?dates=' + dateHelper.getDate(dateYearAgo) + ',' + dateHelper.getDate() + '&ordering=-added&page_size=40';

        console.log(url);

        return axios.get(url).then(response => {return response.data})
    } catch(err) {

    }
};

const getSpecificGame = (slug) => {
    try{
        return axios.get('https://api.rawg.io/api/games/' + slug)
    }
    catch(err){

    }
};

//Load data from RAWG and render page with all upcoming releases for the month
router.get('/', function(req, res, next) {
    try {
        const month = dateHelper.getMonth();

        //console.log(cleanDate());

        getReleases()
            .then((response) => {
                const releases = response.data.results;
                const number = releases.length;

                res.status(200);
                return res.render('releases', {
                    title: `${month} releases`,
                    dateHelper: dateHelper,
                    totalNum: number,
                    month: month,
                    releasesAll: releases
                });

            })
            .catch((err) => {
                console.log('Error!');
            });
    }
    catch (err){
        res.status(400);

        return next(createError(400, err.message));
    }
});

//Custom
router.get('/list', validator(schemas.releasesSchema), async (req, res, next) => {
    try {
        let rating = req.query.rating;
        let platform = req.query.platform;

        console.log(rating);
        console.log(platform);

        let list = await getReleases();
        let oldGames = list.results;

        let filteredRating= null;
        let filteredPlatform = null;

        if (rating != null){
            oldGames = oldGames.filter(it => (it.rating <= rating));
        }
        if (platform != null) {
            //filteredPlatform = oldGames.filter(it => it.platforms.every(c => c.platform.slug.includes(platform) === platform));
            //filteredPlatform = oldGames.filter(it => it.platforms.forEach(it2 => {it2.platform.id.includes(platform)}));
            //filteredPlatform = oldGames.filter(it => it.platforms.forEach(it2 => it2.platform.slug.includes(platform)));
            oldGames = oldGames.filter(it => it.platforms.some(it2 => it2.platform.slug === platform));
        }

        console.log(oldGames);


        const number = oldGames.length;







        res.status(200);
        return res.render('releases', {
            title: `Releases`,
            dateHelper: dateHelper,
            totalNum: number,
            releasesAll: oldGames
        });
    }
    catch (err){
        res.status(400);

        return next(createError(400, err.message));
    }
});

//TO DO: MOVE THIS TO game.js and differentiate loading game details from JSON vs RAWG api
router.get('/:slug', function(req, res, next) {
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
