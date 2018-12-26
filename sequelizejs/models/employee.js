const Sequelize = require("sequelize")
const db = require('../database/mysql.config.js')

module.exports = db.sequelize.define(
    'employees',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        name:
        {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
            // validate:
            // {
            //     is: ["^[a-z]+$",'i'],
            //     msg:'will only allow letters'
            // }
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
            //validate: { min: 0, max: 120 ,msg: 'Input age fail'}
        },
        comment: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }
)