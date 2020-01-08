//Modules
const axios = require('axios');

//Helpers
const dateHelper = require('../helpers/dateHelper');

//Returns a RAWG list of games (max 40 games) from the past 12 months ordered by user parameter, defaults to popularity on RAWG website
/* Parameters: ordering , order of request to RAWG
    -added , most popular games on RAWG (how many users added it to their lists)
*/
exports.getReleasesPastYear = (ordering = '-added') => {
    try {
        const url = 'https://api.rawg.io/api/games?dates=' + dateHelper.getDateNoTime(dateHelper.dateYearAgo()) + ',' + dateHelper.getDateNoTime() + '&ordering=' + ordering + '&page_size=40';

        console.log(url);


        return axios.get(url)
            .then(response => {
                    return response.data;
                })
    } catch(err) {
        throw new Error(err.message);
    }
};

//Returns details of a specific game from RAWG based on game slug as user parameter
//Parameter: slug , game slug as per RAWG
exports.getSpecificGame = (slug) => {
    try{
        const url = 'https://api.rawg.io/api/games/' + slug;

        console.log(url);

        return axios.get(url)
            .then(response => {
                return response.data;
            })
    }
    catch(err){
        throw new Error(err.message);
    }
};