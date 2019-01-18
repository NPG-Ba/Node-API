"use strict";

var PersonService = _interopRequireWildcard(require("../services/person.js"));

var Joi = _interopRequireWildcard(require("joi"));

var Validate = _interopRequireWildcard(require("../models/validate/personvalidate"));

var _application = _interopRequireDefault(require("../config/application"));

var _codes = _interopRequireDefault(require("../models/response/codes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }