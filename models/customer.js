const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../services/mysql');
const defaultOption = require('./default')

const customer = sequelize.define("customer", {
    "id": {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "first_name": Sequelize.STRING,
    "last_name": Sequelize.STRING,
    "full_name": Sequelize.STRING,
    "email": Sequelize.STRING,
    "item": Sequelize.STRING,
    "qty": Sequelize.INTEGER,
    "total_price": Sequelize.INTEGER
}, defaultOption);

module.exports = customer