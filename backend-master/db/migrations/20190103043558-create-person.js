'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Person', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
      },
      age: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING(512)
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Person')
  }
}
