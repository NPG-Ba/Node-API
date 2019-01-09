'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
  };
  return Person;
};