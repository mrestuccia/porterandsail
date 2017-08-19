const conn = require('./db');

const PlaceTags = conn.define('placetags', {
});

module.exports = PlaceTags;
