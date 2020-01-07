//Modules
const express = require('express');

//Create router
const router = express.Router();

//Controller
const indexController = require('../controllers/indexController');

//Routes

//GET index/home page
router.get('/', indexController.displayIndex);

module.exports = router;
