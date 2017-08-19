const conn = require('./db');

const HotelPlaces = conn.define('hotelplaces', {
});

module.exports = HotelPlaces;
