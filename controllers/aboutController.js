//Modules
const createError = require('http-errors');

//Models
const localGames = require('../models/localGames');

//Display about page
exports.displayAbout = (req, res, next) => {
    try{
        res.status(200);

        return res.render('about', {
            title: 'About'
        });
    }
    catch (err){
        res.status(400); //Is this not redundant due to next(createError(404))?

        return next(createError(err.status, err.message)); //Here I am specifying a 404 error, how do I get something like err.status?
    }
};