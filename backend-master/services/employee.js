import db from '../db/models';

export function getCountEmp() {
    const data = db.Person.findAndCountAll();
    return data;
}
export function getAllEmp(limit, offset) {
    return db.Person.findAll({ offset: offset, limit: limit,order: [['id', 'DESC']] });
}
export function getById(id) {
    return db.Person.findAll({where: {id: id}});
}
export function addNewEmp(data) {
    if (db.Person.create(data))
        return true;
    return false;
}
export function deleteById(id) {
    if (db.Person.destroy({
        where: {
            id: id
        }
    }))
        return true;
    return false;
}
export function updateById(emp, data) {
    emp.forEach((e) => {
        e.update({
            name: data.name ? data.name : e.name,
            age: data.age ? data.age : e.age,
            comment: data.comment ? data.comment : e.comment
        });
    });
}
export function updateAgeById(emp, input_age) {
    emp.forEach((e) => {
        e.update({
            age: input_age
        });
    });
}
