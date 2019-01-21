import * as Joi from 'joi'
module.exports = {
  schema: Joi.object().keys({
    name: Joi.string().regex(/[^\p{L}\s_]+$/i).required().max(10),
    // name: Joi.string().normalize('NFKD'),
    age: Joi.number().integer().min(15).max(150).required(),
    comment: Joi.string().allow('', null).default('')
  })
}


























