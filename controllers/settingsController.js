//Modules
const createError = require('http-errors');

//Display the Settings page
exports.displaySettings = (req, res, next) => {
    try{
        res.status(200);

        return res.render('settings', {
            title: 'Settings'
          });
    }
    catch (err){
        res.status(400); //Is this not redundant due to next(createError(404))?

        return next(createError(err.status, err.message)); //Here I am specifying a 404 error, how do I get something like err.status?
    }
};