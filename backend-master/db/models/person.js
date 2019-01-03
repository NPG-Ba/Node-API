'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
      tableName: 'Person', // overloading name table
      createdAt: false,
      updatedAt: false
    });
  Person.associate = function (models) {
    // associations can be defined here
  };
  return Person;
};