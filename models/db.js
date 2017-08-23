const Sequelize = require('sequelize');

const logging = process.env.SEED || false;

const db = new Sequelize(process.env.DATABASE_URL, { logging: logging });

module.exports = db;
