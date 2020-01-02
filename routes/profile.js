const express = require('express');
const createError = require('http-errors');

const router = express.Router();

//Load FileSystem module for readFileSync
const fs = require('fs');

//Load profile and render games based on profile.json
router.get('/', function(req, res, next) {
  try {
    //Not using require() because any changes to JSON file are not reflected unless server is restarted
    let profile = JSON.parse(fs.readFileSync('./public/json/profile.json'));
    let gameList = JSON.parse(fs.readFileSync('./public/json/manifest.json'));

    let favs = gameList.items.filter(it => profile.favs.includes(it.id));

    res.status(200);

    return res.render('profile', {
      title: profile.userName,
      userName: profile.userName,
      total: favs.length,
      favArray: favs
    });
  }
  catch (err){
    res.status(400);

    return next(createError(400, err.message));
  }
});

router.post('/addWishlist', function (req, res) {
  let oldProfile = JSON.parse(fs.readFileSync('./public/json/profile.json'));
  let newWish = req.body.wishName;
  oldProfile.wishlist.push(newWish);

  let newProfile = JSON.stringify(oldProfile);
  fs.writeFile('./public/json/profile.json', newProfile, 'utf8', function(err){
    if(err){
      throw err;
    }
    else{
      console.log("Success!");
    }
  });

  return res.redirect('/profile');
});

module.exports = router;
