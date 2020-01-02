const Joi = require('joi');

const idSchema = Joi.string().alphanum();

module.exports = {idSchema};