const express = require('express');
const createError = require('http-errors');
const axios = require('axios');

//test

const router = express.Router();

const getMonth = () => {
    const date = new Date();

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'August', 'November', 'December'];

    return monthList[date.getMonth()];
};

const getToday = () => {
    const date = new Date();

    const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const mm = (date.getMonth() < 10 ? '0' : '') + ((date.getMonth() === 11 ? date.getMonth() : date.getMonth()+1));
    const yyy = date.getFullYear();

    return (yyy + '-' + mm + '-' + dd);
};

//Function to return a promise
//Creating function allows us to pass parameters to it, if necessary (not used now)
const getNewReleases = () => {
    try {
        const date = new Date();
        console.log(getToday());

        return axios.get('https://api.rawg.io/api/games?dates=' + getToday() + ',2020-01-31&ordering=released&page_size=40')
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

//Load data from RAWG and render page
router.get('/', function(req, res, next) {
    try {
        const month = getMonth();

        getNewReleases()
            .then((response) => {
                const releases = response.data.results;

                //console.log(JSON.stringify(response.data.results, null, 2));

                const number = releases.length;

                //console.log(releases);

                //console.log(releases[0].platforms[0]);

                res.status(200);
                return res.render('releases', {
                    totalNum: number,
                    month: month,
                    releasesAll: releases
                    //title: profile.userName,
                    //userName: profile.userName,
                    //total: favs.length,
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

router.get('/:slug', function(req, res, next){
    try{
        getSpecificGame(req.params.slug)
            .then((response) => {
                //console.log(response.data);

                const gameDetails = response.data;

                res.status(200);
                return res.render('game', {
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
