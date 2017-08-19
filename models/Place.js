const conn = require('./db');

const Place = conn.define('place', {
    name: {
        type: conn.Sequelize.STRING,
    }
});

module.exports = Place;
