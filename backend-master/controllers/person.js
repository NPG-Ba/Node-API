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
      PersonService.getAllPerson(limit, offset).then((emp) => {
        res.status(CodeAPI[200]).send({
          data: emp,
          length: emp.length,
          pages: pages
        })
      }, () => {
        res.status(CodeAPI[204]).send({
          message: 'No data',
          data: {}
        })
      })
    }, (error) => {
      res.status(CodeAPI[500]).send({
        message: error.message
      })
    })
  },
  getAllPersonByIdOrPage: async (req, res, next) => {
    let limit = AppConf.page.default
    // number of records per page
    let offset = 0
    // page number current
    let id = req.params.id
    let page = req.params.page
    try {
      var emp
      // Gọi service
      if (id === 0 || page === 0) {
        console.log(id, page)
        emp = await PersonService.getAllPerson(limit, offset)
      } else {
        emp = await PersonService.getAllPersonWhereById(limit, offset, id)
      }
      // trả về res
      if (emp.length > 0) {
        res.status(CodeAPI[200]).send({
          data: emp,
          length: emp.length,
          pages: page
        })
      } else {
        res.status(CodeAPI[204]).send({
          message: 'No data'
        })
      }
    } catch (error) {
      res.status(CodeAPI[500]).send({
        message: error.message
      })
    }
  },
  getByIdPerson: (req, res) => {
    // get emp với id
    PersonService.getPersonById(parseInt(req.params.id)).then((data) => {
      if (data.length > 0) {
        res.status(CodeAPI[200]).send({
          data: data[0],
          length: data.length
        })
      } else {
        return res.status(CodeAPI[404]).send({
          message: 'Emp not found with id  ' + req.params.id
        })
      }
    }, (error) => {
      return res.status(CodeAPI[500]).send({
        message: ' Server err : ' + error
      })
    })
  },
  // add a new employeee

  addNewPerson: (rep, res) => {
    let data = rep.body
    // validate input
    let result = Joi.validate(data, Validate.schema, (err, _value) => {
      if (err) return false
      return true
    })
    if (result) {
      data.comment = '<p>' + data.comment.split('\n').join('</p><p>') + '</p>'
      PersonService.addNewPerson(data).then((data) => {
        res.status(CodeAPI[200]).send({
          data: data.dataValues
        })
      }, (error) => {
        return res.status(CodeAPI[500]).send({
          message: 'Error retrieving Person with id ' + error
        })
      })
    } else {
      return res.status(CodeAPI[400]).send({
        message: 'The url in the request is invalid : ' + rep.body.id
      })
    }
  },

  // update employee

  updatePerson: async (rep, res) => {
    const data = rep.body
    let result = Joi.validate(data, Validate.schema, (err, _value) => {
      if (err) return false
      return true
    })

    if (result) {
      try {
        let emp = await PersonService.getPersonById(parseInt(rep.params.id))
        if (emp.length > 0) {
          await PersonService.updatePersonById(emp, data)
          res.status(CodeAPI[200]).send({
            data: emp
          })
        }
      } catch (error) {
        res.status(CodeAPI[400])({
          data: {},
          message: `Cannot update a new emp failed: ${error}`
        })
      }
    } else {
      return res.status(CodeAPI[400]).send({
        message: 'Input is invalid, please check input : '
      })
    }
  },

  // delete employee

  deletePerson: (rep, res) => {
    PersonService.getPersonById(rep.params.id).then((data) => {
      if (data.length > 0) {
        PersonService.deletePersonById(rep.params.id).then(() => {
          res.status(CodeAPI[200]).send({
            result: true
          })
        }, () => {
          res.status(CodeAPI[200]).send({
            result: false
          })
        })
      } else {
        res.status(CodeAPI[404]).send({
          message: 'Emp not found with id ' + rep.params.id
        })
      }
    }, (error) => {
      return res.status(CodeAPI[500]).send({
        message: ' Server err : ' + error
      })
    })
  },
  updateAgePerson: (rep, res) => {
    PersonService.getPersonById(parseInt(rep.params.id)).then((data) => {
      console.log(data[0].dataValues.age + 1)
      // if (data[0].dataValues.age <= 120) {
      //   data[0].dataValues.age = parseInt(data[0].dataValues.age) + 1
      //   PersonService.updateAgePersonById(data[0]).then(() => {
      //     res.status(CodeAPI[200]).send({
      //       result: true
      //     })
      //   }, () => {
      //     return res.status(CodeAPI[400]).send({
      //       result: false
      //     })
      //   })
      // } else {
      //   return res.status(CodeAPI[404]).send({
      //     message: false
      //   })
      // }
    }, (error) => {
      res.status(CodeAPI[500]).send({
        message: error.message
      })
    })
  }
}
