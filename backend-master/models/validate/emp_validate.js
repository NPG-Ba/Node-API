const Joi = require('joi');

module.exports = {
    
    schema: Joi.object().keys({
        name : Joi.string().regex(/^[a-zA-Z ]+$/i).min(1),
        age: Joi.number().integer().positive().required().min(18).max(120),
        comment : Joi.string().regex(/^[a-zA-Z0-9 ]+$/i).required()
      })
}