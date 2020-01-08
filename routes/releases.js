const express = require('express');

//Helpers
const schemas = require('../helpers/schemas');

//Middleware
const validator = require('../middleware/validator');

//Controller
const externalGameController = require('../controllers/externalGameController');

//Create a router
const router = express.Router();

//Display the default releases page
router.get('/', externalGameController.displayReleases);

//Custom
router.get('/filter', validator(schemas.releasesSchema), externalGameController.displayFilteredReleases);

//TO DO: MOVE THIS TO game.js and differentiate loading game details from JSON vs RAWG api
router.get('/:slug', externalGameController.displaySpecificRelease);

module.exports = router;
