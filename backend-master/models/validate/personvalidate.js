import * as Joi from 'joi'
module.exports = {
  schema: Joi.object().keys({
    // name: Joi.string().regex(/^[a-zA-Z ]+$/i),
    name: Joi.string().normalize('NFKD'),
    age: Joi.number().integer().min(15).max(150),
    comment: Joi.string().normalize('NFKD')
  })
}
 