//Modules
const createError = require('http-errors');

//Models
const localGames = require('../models/localGames');

//Display index page
exports.displayIndex = (req, res, next) => {
    try{
        const games = localGames.getGames();

        res.status(200);

        return res.render('index', {
            title: 'Home',
            total: games.items.length,
            gameArray: games.items
        });
    }
    catch (err){
        res.status(400);

        return next(createError(400, err.message));
    }
};