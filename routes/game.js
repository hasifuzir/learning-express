//Modules
const express = require('express');

//Create router
const router = express.Router();

//Controller
const localGameController = require('../controllers/localGameController');

//Returns game details page based on specific ID as parameter
router.get('/:id', localGameController.displayGame);

module.exports = router;
