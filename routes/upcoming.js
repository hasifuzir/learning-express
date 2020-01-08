const express = require('express');

//Controller
const externalGameController = require('../controllers/externalGameController');

//Create a router
const router = express.Router();

//Load data from RAWG and render page with all upcoming releases for the month
router.get('/', externalGameController.displayUpcoming)

module.exports = router;