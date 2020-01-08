//Modules
const express = require('express');

//Create router
const router = express.Router();

//Controller
const settingsController = require('../controllers/settingsController');

//Render the About page
router.get('/', settingsController.displaySettings);

module.exports = router;
