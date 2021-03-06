"use strict";

var Joi = _interopRequireWildcard(require("joi"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

module.exports = {
  schema: Joi.object().keys({
    name: Joi.string().regex(/[^\p{L}\s_]+$/i).required().max(10),
    // name: Joi.string().normalize('NFKD'),
    age: Joi.number().integer().min(15).max(150).required(),
    comment: Joi.string().allow('', null).default('')
  })
};