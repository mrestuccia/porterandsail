const conn = require('./db');

const Hotel = conn.define('hotel', {
    name: {
        type: conn.Sequelize.STRING,
    }
});

module.exports = Hotel;
