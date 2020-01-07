//Modules
const express = require('express');
const createError = require('http-errors');

//Create router
const router = express.Router();

//Controller
const aboutController = require('../controllers/aboutController');

//Render the About page
router.get('/', aboutController.displayAbout);

module.exports = router;
