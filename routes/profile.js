//Modules
const express = require('express');

//Create new router
const router = express.Router();

//TO MOVE
const fs = require('fs');
const createError = require('http-errors');

//Controllers
const profileController = require('../controllers/profileController');

//Display Profile page
router.get('/', profileController.displayProfile);

//Add to wishlist
router.post('/addWishlist', profileController.addWishlist);

//Delete item from wishlist
router.use('/removeWishlist', profileController.removeWishlist);

module.exports = router;
