const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, { logging: true });

module.exports = db;
