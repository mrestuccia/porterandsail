const conn = require('./db');

const UserPlaces = conn.define('userplaces', {
});

module.exports = UserPlaces;
