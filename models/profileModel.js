//Modules
const fs = require('fs').promises;

//URL
const url = './public/json/profile.json';

exports.getProfile = async () => {
    return JSON.parse(await fs.readFile(url));
};

exports.writeProfile = async (profile) => {
    return await fs.writeFile(url, profile, 'utf8');
};