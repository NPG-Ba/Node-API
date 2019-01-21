"use strict";

var PersonService = _interopRequireWildcard(require("../services/person.js"));

var Joi = _interopRequireWildcard(require("joi"));

var Validate = _interopRequireWildcard(require("../models/validate/personvalidate"));

var _application = _interopRequireDefault(require("../config/application"));

var _codes = _interopRequireDefault(require("../models/response/codes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

module.exports = {
  // get all person
  getAllPerson: function getAllPerson(req, res) {
    var limit = _application.default.page.default; // number of records per page

    var offset = 0;
    var page = 1; // page number current
    // Total records

    var totalRows = 0; // call service get all emp

    PersonService.getCountPerson().then(function (data) {
      totalRows = data.count;
      var pages = Math.ceil(parseInt(totalRows) / parseInt(limit)); // Total page

      offset = limit * (page - 1);
      PersonService.getAllPerson(limit, offset).then(function (person) {
        res.status(_codes.default[200]).send({
          data: person,
          length: person.length,
          pages: pages
        });
      }, function () {
        res.status(_codes.default[204]).send({
          data: {}
        });
      });
    }, function (error) {
      res.status(_codes.default[500]).send({
        message: error.message
      });
    });
  },
  // get more person id
  getAllPersonByIdOrPage: function getAllPersonByIdOrPage(req, res, next) {
    var limit = _application.default.page.default; // number of records per page

    var offset = 0; // page number current

    var id = parseInt(req.params.id); // Call service

    if (id === 0) {
      PersonService.getAllPerson(limit, offset).then(function (people) {
        res.status(_codes.default[200]).send({
          data: people,
          length: people.length
        });
      }, function () {
        res.status(_codes.default[204]).send({
          data: {}
        });
      });
    } else {
      PersonService.getAllPersonWhereById(limit, offset, id).then(function (people) {
        res.status(_codes.default[200]).send({
          data: people,
          length: people.length
        });
      }, function () {
        res.status(_codes.default[204]).send({
          data: {}
        });
      });
    }
  },
  // add a new employeee
  addNewPerson: function addNewPerson(req, res) {
    var data = req.body; // validate input

    var result = Joi.validate(data, Validate.schema, function (err, _value) {
      if (err) return false;
      return true;
    });

    if (result) {
      PersonService.addNewPerson(data).then(function (data) {
        res.status(_codes.default[200]).send({
          data: data.dataValues
        });
      }, function () {
        res.status(_codes.default[501]).send();
      });
    } else {
      return res.status(_codes.default[400]).send();
    }
  },
  // delete employee
  deletePerson: function deletePerson(req, res) {
    // get id
    var id = parseInt(req.params.id);
    PersonService.getPersonById(id).then(function (data) {
      PersonService.deletePersonById(id).then(function () {
        res.status(_codes.default[200]).send();
      }, function () {
        res.status(_codes.default[501]).send();
      });
    }, function () {
      res.status(_codes.default[404]).send();
    });
  },
  // update age person id
  upAgePerson: function upAgePerson(req, res) {
    var id = parseInt(req.params.id);
    PersonService.getPersonById(id).then(function (data) {
      // No data
      if (data.length === 0) {
        res.status(_codes.default[500]).send();
      } else {
        var age = parseInt(data[0].dataValues.age) + 1;

        if (age <= 150) {
          PersonService.updatePerson(id, age).then(function () {
            res.status(_codes.default[200]).send();
          }, function () {
            res.status(_codes.default[501]).send();
          });
        } else {
          res.status(_codes.default[400]).send();
        }
      }
    }, function () {
      res.status(_codes.default[501]).send();
    });
  },
  // down age person id
  downAgePerson: function downAgePerson(req, res) {
    var id = parseInt(req.params.id);
    PersonService.getPersonById(id).then(function (data) {
      // No data
      if (data.length === 0) {
        res.status(_codes.default[500]).send();
      } else {
        var age = parseInt(data[0].dataValues.age) - 1;

        if (age >= 15) {
          PersonService.updatePerson(id, age).then(function () {
            res.status(_codes.default[200]).send();
          }, function () {
            res.status(_codes.default[501]).send();
          });
        } else {
          res.status(_codes.default[400]).send();
        }
      }
    }, function () {
      res.status(_codes.default[501]).send();
    });
  }
};