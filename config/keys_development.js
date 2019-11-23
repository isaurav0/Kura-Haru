var Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:data@localhost:5432/kuraharu', {logging: false});
module.exports= db