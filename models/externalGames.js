//Modules
const axios = require('axios');

//Helpers
const dateHelper = require('../helpers/dateHelper');

//Returns a RAWG list of games (max 40 games) from the past 12 months ordered by user parameter, defaults to popularity on RAWG website
/* Parameters: ordering , order of request to RAWG
    -added , most popular games on RAWG (how many users added it to their lists)
*/
exports.getReleases = (range = 'past_year', ordering = '-added') => {
    try {
        let url = null;

        if (range === 'past_year'){
            url = 'https://api.rawg.io/api/games?dates=' + dateHelper.getDateNoTime(dateHelper.dateYearAgo()) + ',' + dateHelper.getDateNoTime() + '&ordering=' + ordering + '&page_size=40';
        }
        else if (range === 'current_month'){
            url = 'https://api.rawg.io/api/games?dates=' + dateHelper.getDateNoTime() + ',' + dateHelper.getDateNoTime(dateHelper.dateEndOfMonth()) + '&ordering=' + ordering + '&page_size=40';

        }
        else {
            throw new Error('Invalid range parameter passed')
        }
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