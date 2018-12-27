const employee = require('../models').employees;
const err = require('../models/response/error.js')
const EmployeeService = require('../services/employee.js');
module.exports={
    get_emp : async (req, res, next)=> {
        try
        {
            // Gọi service
            const emp = await EmployeeService.get_all();

            // trả về res
            if(emp.length>0)
            {
                res.json({
                    data:emp,
                    length: emp.length
                });
            }else
            {
                
            }
        }catch(error){
            res.json({
                result:'failed123',
                data:error,
                message:'! oke all',
                length: 0
            });
        }
    },
    get_id : async(req,res)=>{

        const {id} = parseInt(req.params);
        console.log(typeof(id));
            try {
                let emp = await EmployeeService.get_id(id);

                if (emp.length > 0) {
                    res.json({
                        result:'ok',
                        data:emp,
                        message:'oke ',
                        length: emp.length
                    });
                } else {
                    res.json({
                        result:'failed',
                        data:emp,
                        message:'Not find',
                        length: emp.length
                    });
                }
            } catch (error) {
                
            }  
    },
    add_emp : async(rep,res)=>{
        let { name,age,comment} = rep.body;
        console.log(rep.body);
        try {
            let emp = await employee.create({
                name,
                age: parseInt(age),
                comment
            });
            
            if (emp) {
                res.json({
                    result: 'ok',
                    data: emp
                });
            } else {
                res.json({
                    result: 'failed',
                    data: {},
                    message: 'Insert a new emp failed'
                });
            }
        } catch (error) {
            res.json({
                result: 'failed',
                data: {},
                message: `Insert a new emp failed: ${error}`
            });
        }
    },
    update_emp : async (rep,res)=>{
        const {id} =rep.params;
        let { name,age,comment} = rep.body;
        try {
            let emp = await employee.findAll({
                attributes:['id','name','age','comment'],
                where: {
                    id
                }
            });
            if (emp.length > 0) {
                emp.forEach(async (e)=>{
                    await e.update({
                        name: name ? name : e.name,
                        age : age ? age : e.age
                    }); 
                    console.log(e.name); 
                });
                res.json({
                    result : 'ok',
                    data: emp,
                    message : 'Update successfully'
                })
            } else {
                res.json({
                    result: 'failed',
                    data: {},
                    message: 'Update a new emp failed'
                });
            }
        } catch (error) {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot update a new emp failed: ${error}`
            });
        }
    },

    delete_emp : async (rep,res) =>{
        const {id} = rep.params;
        try {
            await employee.destroy({
                where: {
                    id:id
                }
            });
            res.json({
                result: 'ok',
                message: 'Delete successfuly'
            });
        } catch (error) {
            res.json({
                result: 'ok',
                data:{},
                message: `Delete failed . ${error}`
            });
        }
    }

}