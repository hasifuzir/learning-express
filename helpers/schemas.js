const Joi = require('joi');

platforms = ['pc', 'playstation4', 'xbox-one', 'macos', 'nintendo-switch', 'ios', 'android', 'linux'];

const gameSchema = {
    params: Joi.object({
        id: Joi.string().alphanum().required()
    })
};

const releasesSchema = {
    query: Joi.object({
        min_rating: Joi.number().integer().min(0).max(5),
        platform: Joi.array().items(Joi.string().alphanum().valid(platforms))
    })
};

module.exports = {
    gameSchema,
    releasesSchema
};