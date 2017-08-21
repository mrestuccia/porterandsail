const conn = require('./db');

const UserPlaces = conn.define('userplaces', {},
  {
    classMethods: {
      getUserPlacesById: function (id) {
        return UserPlaces.findAll({ where: { userId: id } })
          .then(function (_userPlaces) {
            return _userPlaces.map(function (_userPlace) {
              return _userPlace.place.id;
            });
          });
      }
    }
  });

module.exports = UserPlaces;
