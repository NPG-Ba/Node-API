import * as Joi from 'joi'
module.exports = {
  schema: Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-Z ]+$/i),
    age: Joi.number().integer().min(18).max(120),
    comment: Joi.string().regex(/^[a-zA-Z0-9 \n]+$/i)
  })
}
