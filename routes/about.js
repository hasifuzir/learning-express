const express = require('express');
const router = express.Router();

//Render the About page
router.get('/', function(req, res) {
  return res.render('about', {
    title: 'About'
  });
});

module.exports = router;
