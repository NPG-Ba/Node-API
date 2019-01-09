const employee = require('../models').employees;
const err = require('../models/response/codes.js')
const EmployeeService = require('../services/employee.js');
const Joi = require('joi');
const validate = require('../validate/emp_validate.js');
const config = require('../config')

module.exports = {

    // get all employee

    get_emp: async (req, res, next) => {
        const ip = res.socket.remoteAddress;
        console.log(ip)
        //if (req.params.id === '0') next('route')
        let limit = config.page_limit;   

        // number of records per page
        let offset = 0;
        
        // call service get all emp
        const data = await EmployeeService.get_count(); 
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
        //get emp với id
        try {
            let emp = await EmployeeService.get_id(parseInt(req.params.id));
            if (emp.length > 0) {
                res.status(200).send(emp);
            } else {
                return res.status(404).send({
                    message: "Emp not found with id " + req.params.id
                });
            }
            
        } catch (error) {
            res.status(500).send("There was a problem finding the emp." + 'Message : ' + error);
            
        }

    },
    // add a new employeee

    add_emp: async (rep, res) => {
        let data = rep.body;

        // validate input
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
                res.status(500).send("There was a problem add new the emp.");
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
                        res.status(200).send("Emp: "+ id +" was deleted.");
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
                res.status(500).send("There was a problem deleting the emp.");
            }
    },
    update_age : async (rep,res) =>{
        try {
            const id = rep.params.id;
            let emp = await employee.findAll({
                where: {
                    id
                }
            });
            let age = emp[0].age + 1;
            console.log(age <= 120)
            if(age <= 120){
                try {
                    await EmployeeService.update_age_id(emp,age);
                    res.status(200).send("Emp: "+ id +" was update.");
                } catch (error) {
                    res.status(500).send("There was a problem update the emp.");
                }
            }else
            {
                return res.status(400).send({
                    message: "Emp age <=120 "
                });
            }
        } catch (error) {

            res.status(500).send("There was a problem update the emp.");
        }
        
            
    }

}