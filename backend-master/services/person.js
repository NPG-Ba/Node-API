import db from '../db/models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

export function getCountPerson() {
    const data = db.Person.findAndCountAll();
    return data;
}
export function getAllPerson(limit, offset) {
    return db.Person.findAll({ offset: offset, limit: limit,order: [['id', 'DESC']] });
}
export function getAllPersonWhereById(limit, offset,id) {
    return db.Person.findAll({where: {
        id: {
          [Op.lt]: id
        }
      }, offset: offset, limit: limit,order: [['id', 'DESC']] });
}
export function getPersonById(id) {
    return db.Person.findAll({where: {id: id}});
}
export function addNewPerson(data) {
    if (db.Person.create(data))
        return true;
    return false;
}
export function deletePersonById(id) {
    if (db.Person.destroy({where: {id: id}})) return true;
    return false;
}
export function updatePersonById(emp, data) {
    emp.forEach((e) => {
        e.update({
            name: data.name ? data.name : e.name,
            age: data.age ? data.age : e.age,
            comment: data.comment ? data.comment : e.comment
        });
    });
}
export function updateAgePersonById(emp, input_age) {
    emp.forEach((e) => {
        e.update({
            age: input_age
        });
    });
}
