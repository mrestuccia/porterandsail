const app = require('express').Router();
const user = require('./user');

app.use('/user', user);

module.exports = app;
