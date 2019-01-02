const employee = require('../models').employees;
const paginate = require('express-paginate');

module.exports = {
    get_count: () => {
        const data = employee.findAndCountAll();
        return data;
    },
    get_all: (limit,offset) => {
        const obj = employee.findAll({ offset: offset, limit: limit });
        return obj;
    },
    get_id: (id) => {
        const obj = employee.findAll({
            where: {
                id: id
            }
        });
        return obj;
    },
    add_emp: (data) => {
        if (employee.create(data)) return true;
        return false;
    },
    delete_id: (id) => {
        if (employee.destroy({
                where: {
                    id: id
                }
            })) return true;
        return false;
    },
    update_id: (emp,data) => {
        emp.forEach((e) => {
            e.update({
                name: data.name ? data.name : e.name,
                age: data.age ? data.age : e.age,
                comment : data.comment ? data.comment : e.comment
            })
        })
    },
    update_age_id: (emp,input_age) => {
        emp.forEach((e) => {
            e.update({
                age: input_age
            })
        })
    }
}
