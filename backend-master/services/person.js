import db from '../db/models'

const Sequelize = require('sequelize')
const Op = Sequelize.Op
// get count person
export function getCountPerson () {
  const data = db.Person.findAndCountAll()
  return data
}
// get all person 
export function getAllPerson (limit, offset) {
  return db.Person.findAll({ offset: offset, limit: limit, order: [['id', 'DESC']] })
}
// get more person with id min
export function getAllPersonWhereById (limit, offset, id) {
  return db.Person.findAll({ where: {
    id: {
      [Op.lt]: id
    }
  },
  offset: offset,
  limit: limit,
  order: [['id', 'DESC']] })
}
// get person with id
export function getPersonById (id) {
  return db.Person.findAll({ where: { id: id } })
}
// add new person
export function addNewPerson (data) {
  return db.Person.create(data)
}
// delete person with id 
export function deletePersonById (id) {
  return db.Person.destroy({ where: { id: id } })
}
// update person with id
export function updatePersonById (person, data) {
  person.forEach((e) => {
    e.update({
      name: data.name ? data.name : e.name,
      age: data.age ? data.age : e.age,
      comment: data.comment ? data.comment : e.comment
    })
  })
}
// update age person
export function updateAgePersonById (id,inputAge) {
  db.Person.update(
    // Values to update
    { age :  inputAge},
    // Clause
    { where: 
        {
            id: id
        }
    }
    ).then(count => {
        return count;
    });
}
