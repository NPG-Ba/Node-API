'use strict';
module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define('employees', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  employees.associate = function(models) {
    // associations can be defined here
  };
  return employees;
};