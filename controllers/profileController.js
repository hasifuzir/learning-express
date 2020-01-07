//Modules
const createError = require('http-errors');

//Models
const localGames = require('../models/localGames');
const profileModel = require('../models/profileModel');

//Helpers
const schemas = require('../helpers/schemas');

//Middleware
const validator = require('../middleware/validator');

//Display index page
exports.displayProfile = async (req, res, next) => {
    try {
        const profile = await profileModel.getProfile();
        let gameList = localGames.getGames();

        const favs = gameList.items.filter(it => profile.favs.includes(it.id));

        res.status(200);

        return res.render('profile', {
            title: profile.userName,
            userName: profile.userName,
            total: favs.length,
            favArray: favs,
            wishArray: profile.wishlist
        });
    }
    catch (err){
        res.status(400);

        return next(createError(400, err.message));
    }
};

//Add to wishlist
exports.addWishlist = async (req, res, next) => {
    try {
        let oldProfile = await profileModel.getProfile();
        let writeFlag = true;

        const newWish = req.body.wishName;

        oldProfile.wishlist.forEach(id => {
            if (id.toLowerCase() === newWish.toLowerCase()){
                writeFlag = false;
            }
            else{

            }
        });

        if (writeFlag === true){
            oldProfile.wishlist.push(newWish);
        }

        const newProfile = JSON.stringify(oldProfile);
        await profileModel.writeProfile(newProfile);

        return res.redirect('/profile');
    }
    catch(err) {
        res.status(400);

        return next(createError(400, err.message));
    }
};

//Delete wishlist based on req.body
exports.removeWishlist = async (req, res,next) => {
    try {
        let oldProfile = await profileModel.getProfile();
        const deleteWish = req.body.wishName;

        oldProfile.wishlist = oldProfile.wishlist.filter(item => item !== deleteWish);

        const newProfile = JSON.stringify(oldProfile);

        await profileModel.writeProfile(newProfile);

        return res.redirect('/profile');
    }
    catch(err) {
        res.status(400);

        return next(createError(400, err.message));
    }
};