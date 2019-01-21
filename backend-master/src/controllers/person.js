import * as PersonService from '../services/person.js'
import * as Joi from 'joi'
import * as Validate from '../models/validate/personvalidate'
import AppConf from '../config/application'
import CodeAPI from '../models/response/codes'

module.exports = {
  // get all person
  getAllPerson: (req, res) => {
    let limit = AppConf.page.default
    // number of records per page
    let offset = 0
    let page = 1 // page number current
    // Total records
    let totalRows = 0
    // call service get all emp
    PersonService.getCountPerson().then((data) => {
      totalRows = data.count
      const pages = Math.ceil(parseInt(totalRows) / parseInt(limit))
      // Total page
      offset = limit * (page - 1)
      PersonService.getAllPerson(limit, offset).then((person) => {
        res.status(CodeAPI[200]).send({
          data: person,
          length: person.length,
          pages: pages
        })
      }, () => {
        res.status(CodeAPI[204]).send({
          data: {}
        })
      })
    }, (error) => {
      res.status(CodeAPI[500]).send({
        message: error.message
      })
    })
  },

  // get more person id
  getAllPersonByIdOrPage: (req, res, next) => {
    let limit = AppConf.page.default
    // number of records per page
    let offset = 0
    // page number current
    let id = parseInt(req.params.id)
    // Call service
    if ((id === 0)) {
      PersonService.getAllPerson(limit, offset).then((people) => {
        res.status(CodeAPI[200]).send({
          data: people,
          length: people.length
        })
      }, () => {
        res.status(CodeAPI[204]).send({
          data: {}
        })
      })
    } else {
      PersonService.getAllPersonWhereById(limit, offset, id).then((people) => {
        res.status(CodeAPI[200]).send({
          data: people,
          length: people.length
        })
      }, () => {
        res.status(CodeAPI[204]).send({
          data: {}
        })
      })
    }
  },

  // add a new employeee

  addNewPerson: (req, res) => {
    let data = req.body
    // validate input
    let result = Joi.validate(data, Validate.schema, (err, _value) => {
      if (err) return false
      return true
    })
    if (result) {
      PersonService.addNewPerson(data).then((data) => {
        res.status(CodeAPI[200]).send({
          data: data.dataValues
        })
      }, () => {
        res.status(CodeAPI[501]).send()
      })
    } else {
      return res.status(CodeAPI[400]).send()
    }
  },

  // delete employee
  deletePerson: (req, res) => {
    // get id
    let id = parseInt(req.params.id)
    PersonService.getPersonById(id).then((data) => {
      PersonService.deletePersonById(id).then(() => {
        res.status(CodeAPI[200]).send()
      }, () => {
        res.status(CodeAPI[501]).send()
      })
    }, () => {
      res.status(CodeAPI[404]).send()
    })
  },

  // update age person id
  upAgePerson: (req, res) => {
    let id = parseInt(req.params.id)
    PersonService.getPersonById(id).then((data) => {
      // No data
      if (data.length === 0) {
        res.status(CodeAPI[500]).send()
      } else {
        let age = parseInt(data[0].dataValues.age) + 1
        if (age <= 150) {
          PersonService.updatePerson(id, age).then(() => {
            res.status(CodeAPI[200]).send()
          }, () => {
            res.status(CodeAPI[501]).send()
          })
        } else {
          res.status(CodeAPI[400]).send()
        }
      }
    }, () => {
      res.status(CodeAPI[501]).send()
    })
  },

  // down age person id
  downAgePerson: (req, res) => {
    let id = parseInt(req.params.id)
    PersonService.getPersonById(id).then((data) => {
      // No data
      if (data.length === 0) {
        res.status(CodeAPI[500]).send()
      } else {
        let age = parseInt(data[0].dataValues.age) - 1
        if (age >= 15) {
          PersonService.updatePerson(id, age).then(() => {
            res.status(CodeAPI[200]).send()
          }, () => {
            res.status(CodeAPI[501]).send()
          })
        } else {
          res.status(CodeAPI[400]).send()
        }
      }
    }, () => {
      res.status(CodeAPI[501]).send()
    })
  }
}
