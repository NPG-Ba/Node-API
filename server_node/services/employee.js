const employee = require('../models').employees;

module.exports={
    get_all: ()=>{
        const obj = employee.findAll();
        return obj;
    },
    get_id: (id)=>{
        const obj = employee.findAll({
            attributes:['id','name','age','comment','createdAt','updatedAt'],
            where: {
                        id: id
                    }
        });
        return obj;
    }
}