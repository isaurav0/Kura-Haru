const Sequelize = require('Sequelize');
const db = require('../config/keys');

const User = db.define('User', {
    name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }, 
}, {timestamps: false});

module.exports = User