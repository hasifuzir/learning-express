//Modules
const createError = require('http-errors');

//Models
const localGames = require('../models/localGames');

//Display index page
exports.displayGame = async (req, res, next) => {
    try {
        let games = await localGames.getGames();

        const gameFiltered = games.items.find(it => it.id === req.params.id);
    
        if (gameFiltered !== undefined) {
          res.status(200);
        
          return res.render('game', {
            apiGame: false,
            title: gameFiltered.name,
            game: gameFiltered,
          });
        }
        else {
          res.status(400);
    
          return next(createError(400, 'Invalid game ID'));
        }
      }
      catch (err){
        res.status(400);
    
        return next(createError(400, err.message));
      }
};