import * as PersonService from '../services/person.js'
import * as Joi from 'joi'
import * as Validate from '../models/validate/empvalidate'
import AppConf from '../config/application'
import CodeAPI from '../models/response/codes'

module.exports = {

  // get all person
  getAllPerson: async (req, res) => {
    let limit = AppConf.page.default

    // number of records per page
    let offset = 0

    // call service get all emp
    const data = await PersonService.getCountPerson()
    let pageCurrent = data.count
    // Total records
    let page = req.params.page // page number current
    // check page
    page = page === undefined ? (page = 1) : (page)
    const pages = Math.ceil(parseInt(pageCurrent) / parseInt(limit))
    // Total page
    offset = limit * (page - 1)

    try {
      // Gọi service
      const emp = await PersonService.getAllPerson(limit, offset)
      // trả về res
      if (emp.length > 0) {
        res.status(CodeAPI[200]).send({
          data: emp,
          length: emp.length,
          pages: pages
        })
      } else {
        res.status(CodeAPI[204]).send({
          message: 'No data',
          data: {}
        })
      }
    } catch (error) {
      res.status(CodeAPI[500]).send({
        message: error.message
      })
    }
  },
  // getAllPersonByWhere: async (req, res, next) => {

  //     //if (req.params.id === '0') next('route')
  //     let limit = AppConf.page.default;

  //     // number of records per page
  //     let offset = 0;

  //  // page number current
  //     let id = req.params.person;

  // let pages = 4;

  //     try {
  //         // Gọi service
  //         const emp = await PersonService.getAllPersonWhereById(limit,offset,8);
  //         // trả về res
  //         if (emp.length > 0) {
  //             res.status(CodeAPI[200]).send({
  //                 data: emp,
  //                 length: emp.length,
  //                 pages: pages
  //             });
  //         } else {
  //             res.status(CodeAPI[204]).send({
  //                 message: 'No data'
  //             });
  //         }
  //     } catch (error) {
  //         res.status(CodeAPI[500]).send({
  //             message: error.message
  //         });
  //     }
  // },
  getByIdPerson: async (req, res) => {
    // get emp với id
    let emp = await PersonService.getPersonById(parseInt(req.params.id))
    if (emp.length > 0) {
      res.status(CodeAPI[200]).send({
        data: emp,
        length: emp.length
      })
    } else {
      return res.status(CodeAPI[404]).send({
        message: 'Emp not found with id  ' + req.params.id
      })
    }
  },
  // add a new employeee

  addNewPerson: async (rep, res) => {
    let data = rep.body

    // validate input
    let result = Joi.validate(data, Validate.schema, (err, _value) => {
      if (err) return false
      return true
    })
    if (result) {
      try {
        data.comment = '<p>' + data.comment.split('\n').join('</p><p>') + '</p>'
        let isNewRecord = await PersonService.addNewPerson(data)
        if (isNewRecord) {
          res.status(CodeAPI[200]).send({
            data: data
          })
        } else {
          return res.status(CodeAPI[404]).send({
            message: 'The url in the request is invalid : ' + rep.params.id
          })
        }
      } catch (err) {
        return res.status(CodeAPI[500]).send({
          message: 'Error retrieving Emp with id ' + rep.body.id + err
        })
      }
    } else {
      return res.status(CodeAPI[400]).send({
        message: 'The url in the request is invalid : ' + rep.body.id
      })
    }
  },

  // update employee

  updatePerson: async (rep, res) => {
    const data = rep.body
    const id = rep.params.id
    let result = Joi.validate(data, Validate.schema, (err, _value) => {
      if (err) return false
      return true
    })

    if (result) {
      try {
        let emp = await PersonService.getPersonById(id)
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

  deletePerson: async (rep, res) => {
    const id = rep.params.id
    try {
      // Check emp with id  = ?
      const emp = await PersonService.getPersonById(id)

      if (emp.length > 0) {
        console.log(emp)
        // call function Delete emp
        let isDelete = await PersonService.deletePersonById(id)
        if (isDelete) {
          res.status(CodeAPI[200]).send({
            message: isDelete
          })
        } else {
          res.status(CodeAPI[404]).send({
            message: 'Emp not found with id ' + rep.params.id
          })
        }
      } else {
        return res.status(CodeAPI[204]).send({
          message: 'Emp not found with id ' + rep.params.id
        })
      }
    } catch (err) {
      return res.status(CodeAPI[500]).send({
        message: ' Server err : ' + err
      })
    }
  },
  updateAgePerson: async (rep, res) => {
    const id = rep.params.id
    let emp = PersonService.getPersonById(id)
    let age = emp[0].age + 1
    if (age <= 120) {
      try {
        await PersonService.updateAgePersonById(emp, age)
        res.status(CodeAPI[200]).send({
          result: true
        })
      } catch (error) {
        return res.status(CodeAPI[500]).send({
          message: ' Server err : ' + error
        })
      }
    } else {
      return res.status(CodeAPI[404]).send({
        message: 'Emp age <=120 ' + age
      })
    }
  }
}
