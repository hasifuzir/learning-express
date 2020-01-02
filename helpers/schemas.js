const Joi = require('joi');

const gameDetailSchema = {
  query: Joi.object({
    pageNumber: Joi.string().required()
  }),
  params: Joi.object({
    id: Joi.string().alphanum().required()
  })
}

const idSchema = Joi.string().alphanum();

module.exports = {
  idSchema,
  gameDetailSchema
};