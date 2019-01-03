import Person from '../db/models/person';
import * as EmployeeService from '../services/employee.js';
import * as Joi from 'joi';
import * as Validate from '../models/validate/emp_validate';
import AppConf from '../config/application';
import CodeAPI from '../models/response/codes';
module.exports = {

    // get all employee

     getAllEmployee: async (req, res, next) => {

        //if (req.params.id === '0') next('route')
        let limit = AppConf.page.default;   

        // number of records per page
        let offset = 0;
        
        // call service get all emp
        const data = await EmployeeService.getCountEmp(); 
        let page_current = data.count; 
        // Total records

        let page = req.params.page;      // page number current

        //check page
        if(page == 0 | page ==null | page ==NaN) 
        {
            page = 1;
        }
        const pages = Math.ceil(parseInt(page_current) / parseInt(limit)); // Total page 
        offset = limit * (page - 1);

        try {
            // Gọi service
            const emp = await EmployeeService.getAllEmp(limit,offset);
            // trả về res
            if (emp.length > 0) {
                res.status(CodeAPI[200]).send({
                    data: emp,
                    length: emp.length,
                    pages: pages
                });
            } else {
                res.status(CodeAPI[204]).send({
                    message: 'No data'
                });
            }
        } catch (error) {
            res.status(CodeAPI[500]).send({
                message: error.message
            });
        }
    },
    getByIdEmployee: async (req, res) => {
        //get emp với id
                let emp = await EmployeeService.getById(parseInt(req.params.id));
                if (emp.length > 0) {
                    res.status(CodeAPI[200]).send({
                        data: emp,
                        length: emp.length
                    });
                } else {
                    return res.status(CodeAPI[404]).send({
                        message: "Emp not found with id " + req.params.id
                    });
                }
    },
    // add a new employeee

    addNewEmployee: async (rep, res) => {
        let data = rep.body;

        // validate input
        let result = Joi.validate(data, Validate.schema, (err, value) => {
            if (err) return false;
            return true;
        });
        if (result) {
            try {
                let isNewRecord = await EmployeeService.addNewEmp(data);
                if (isNewRecord) {

                    res.status(CodeAPI[200]).send({
                        data : data
                    });
                } else {
                    return res.status(CodeAPI[404]).send({
                        message: "The url in the request is invalid : " + rep.params.id
                    });
                }

            } catch (err) {
                return res.status(CodeAPI[500]).send({
                    message: "Error retrieving Emp with id " + rep.body.id + err
                });
            }
        } else {
            return res.status(CodeAPI[400]).send({
                message: "The url in the request is invalid : " + rep.body.id
            });
        }
    },

    // update employee

    updateEmployee: async (rep, res) => {
        const data = rep.body;

        const id = rep.params.id;
        let result = Joi.validate(data, Validate.schema, (err, value) => {
            if (err) return false;
            return true;
        }); 

        if(result)
        {
            try {
                let emp = await Person.findAll({
                    where: {
                        id
                    }
                });
                if (emp.length > 0) {
                   await EmployeeService.updateById(emp,data);
                    res.status(CodeAPI[200]).send({
                        data: emp
                    });
                }
            } catch (error) {
                res.status(CodeAPI[400])({
                    data: {},
                    message: `Cannot update a new emp failed: ${error}`
                });
            }
        }else
        {
            return res.status(CodeAPI[400]).send({
                message: "Input is invalid, please check input : "
            });
        }
    },

    // delete employee

    deleteEmployee: async (rep, res) => {
        const id =rep.params.id;
            try {
                // Check emp with id  = ?
                const emp = await EmployeeService.getById(id);

                if (emp.length > 0) {

                    // call function Delete emp

                    let isDelete = await EmployeeService.deleteById(id);

                    if (isDelete) {
                        res.status(CodeAPI[200]).send({
                            message: isDelete
                        });
                    } else {
                        res.status(CodeAPI[404]).send({
                            message: "Emp not found with id " + req.params.id
                        });;
                    }
                } else {
                    return res.status(CodeAPI[204]).send({
                        message: "Emp not found with id " + rep.params.id
                    });
                }
            } catch (err) {
                return res.status(CodeAPI[500]).send({
                    message: " Server err : " + err
                });
            }
    },
    updateAgeEmployee : async (rep,res) =>{
        
        const id = rep.params.id;
        let emp = await Person.findAll({
            where: {
                id
            }
        });

        let age = emp[0].age + 1;

        if(age <= 120){
            try {
                await EmployeeService.updateAgeById(emp,age);
                    res.status(CodeAPI[200]).send({
                        result: true
                    });
            } catch (error) {
                return res.status(CodeAPI[500]).send({
                    message: " Server err : " + err
                });
            }
        }else
        {
            return res.status(CodeAPI[404]).send({
                message: "Emp age <=120 " + age
            });
        }
            
    }

}