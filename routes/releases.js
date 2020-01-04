const express = require('express');
const createError = require('http-errors');
const axios = require('axios');

const dateHelper = require('../helpers/dateHelper');

const router = express.Router();

//Function to return a promise
//Creating function allows us to pass parameters to it, if necessary (not used now)
const getReleases = () => {
    try {
        const date = new Date();

        const dateYearAgo = new Date(date.setFullYear(date.getFullYear() -1 ));

        console.log(dateYearAgo);

        let url = 'https://api.rawg.io/api/games?dates=' + dateHelper.getDate(dateYearAgo) + ',' + dateHelper.getDate() + '&ordering=-added&page_size=40';

        console.log(url);

        return axios.get(url)
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
