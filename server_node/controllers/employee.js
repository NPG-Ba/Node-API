const employee = require('../models').employees;
const err = require('../models/response/codes.js')
const EmployeeService = require('../services/employee.js');
const Joi = require('joi');
const validate = require('../validate/emp_validate.js');
//const emp = require('../models/view_model/employee')

module.exports = {

    // get all employee

    get_emp: async (req, res, next) => {

        let limit = 5;   
        // number of records per page
        let offset = 0;
        
        // call service get all emp
        const data = await EmployeeService.get_count(); 
        let page_current = data.count; 
        // Total records

        let page = req.params.page;      // page number current

        const pages = Math.ceil(parseInt(page_current) / parseInt(limit)); // Total page 
        offset = limit * (page - 1);

        try {
            // Gọi service
            const emp = await EmployeeService.get_all(limit,offset);
            // trả về res
            if (emp.length > 0) {
                res.json({
                    data: emp,
                    length: emp.length,
                    pages: pages
                });
            } else {
                res.status(500).send({
                    message: err.message
                });
            }
        } catch (error) {
            res.status(500).send({
                message: err.message
            });
        }
    },
    get_id: async (req, res) => {
                let emp = await EmployeeService.get_id(parseInt(req.params.id));
                if (emp.length > 0) {
                    res.json({
                        data: emp,
                        length: emp.length
                    });
                } else {
                    return res.status(404).send({
                        message: "Emp not found with id " + req.params.id
                    });
                }
    },
    // add a new employeee

    add_emp: async (rep, res) => {
        let data = rep.body;
        let result = Joi.validate(data, validate.schema, (err, value) => {
            if (err) return false;
            return true;
        });
        if (result) {
            try {
                let isNewRecord = await EmployeeService.add_emp(data);
                if (isNewRecord) {
                    res.json({
                        message: "oke: "
                    });
                } else {
                    return res.status(400).send({
                        message: "The url in the request is invalid : " + rep.params.id
                    });
                }

            } catch (err) {
                return res.status(500).send({
                    message: "Error retrieving Emp with id " + rep.body.id + err
                });
            }
        } else {
            return res.status(400).send({
                message: "The url in the request is invalid : " + rep.body.id
            });
        }
    },

    // update employee

    update_emp: async (rep, res) => {
        const data = rep.body;

        const id = rep.params.id;
        let result = Joi.validate(data, validate.schema, (err, value) => {
            if (err) return false;
            return true;
        }); 

        if(result)
        {
            try {
                let emp = await employee.findAll({
                    where: {
                        id
                    }
                });
                if (emp.length > 0) {
                    console.log(data);
                   await EmployeeService.update_id(emp,data);
                    res.json({
                        result: 'oke',
                        data: emp
                    });
                }
            } catch (error) {
                res.json({
                    result: 'failed',
                    data: {},
                    message: `Cannot update a new emp failed: ${error}`
                });
            }
        }else
        {
            return res.status(400).send({
                message: "Input is invalid, please check input : "
            });
        }
    },

    // delete employee

    delete_emp: async (rep, res) => {
        const id =rep.params.id;
            try {
                // Check emp with id  = ?
                const emp = await EmployeeService.get_id(id);

                if (emp.length > 0) {

                    // call function Delete emp

                    let isDelete = await EmployeeService.delete_id(id);

                    if (isDelete) {
                        res.status(200).send({
                            message: 'oke'
                        });
                    } else {
                        res.status(404).send({
                            message: "Emp not found with id " + req.params.id
                        });;
                    }
                } else {
                    return res.status(404).send({
                        message: "Emp not found with id " + rep.params.id
                    });
                }
            } catch (err) {
                return res.status(500).send({
                    message: " Server err : " + err
                });
            }
    }

}