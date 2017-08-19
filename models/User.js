const conn = require('./db');

const User = conn.define('user', {
    name: {
        type: conn.Sequelize.STRING,
    }
});

module.exports = User;
