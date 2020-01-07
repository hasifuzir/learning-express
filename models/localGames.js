//Modules
const fs = require('fs');

//URL
const url = './public/json/manifest.json';

exports.getGames = () => {
    return JSON.parse(fs.readFileSync(url));
};