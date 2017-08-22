const conn = require('./db');

const Place = require('./Place');
const PlaceTags = require('./PlaceTags');
const Tag = require('./Tag');
const HotelPlaces = require('./HotelPlaces');

const UserPlaces = conn.define('userplaces', {},
  {
    classMethods: {

      getUserPlacesById: function (userId) {
        return UserPlaces.findAll(
          { where: { userId: userId } })
          .then(function (userPlaces) {
            return userPlaces.map(function (userPlace) {
              return userPlace.placeId;
            });
          });
      },

      getUserPlacesByHotel: function (_userId, _hotelId) {
        return UserPlaces.findAll({
          include: [
            {
              model: Place,
              required: true,
              include: [
                {
                  model: PlaceTags,
                  include: [
                    { model: Tag }
                  ]
                },
                {
                  model: HotelPlaces,
                  where: { hotelId: _hotelId }
                }
              ]
            }
          ],
          where: {
            userId: _userId
          }
        });
      },

      getByHotel: function (_userId, _hotelId) {
        return UserPlaces.findAll({
          include: [
            {
              model: Place,
              include: [
                {
                  model: PlaceTags,
                  include: [
                    { model: Tag }
                  ]
                },
                {
                  model: HotelPlaces,
                  where: { hotelId: _hotelId }
                }
              ]
            }
          ],
          where: {
            userId: _userId
          }
        });
      },
      getPlacesAndTagsByUser: function (_userId) {
        let arrUserPlaces = [];
        let arrTags = [];
        return UserPlaces.findAll({
          include: [
            {
              model: Place,
              include: [
                {
                  model: PlaceTags,
                  include: [
                    { model: Tag }
                  ]
                }
              ]
            }
          ],
          where: {
            userId: _userId
          }
        })
          .then(function (userPlaces) {
            userPlaces.forEach(userPlace => {
              arrUserPlaces.push(userPlace.place.id);
              userPlace.place.placetags.forEach(placetags => {
                arrTags.push(placetags.tag.name);
              });
            });

            return { places: arrUserPlaces, tags: arrTags };
          });
      },
      getAllUserAndPlacesByHotel: function (hotelId) {
        return UserPlaces.findAll({
          include: [
            {
              model: Place,
              required: true,
              include: [
                {
                  model: HotelPlaces,
                  required: true,
                  where: { hotelId: hotelId }
                }
              ]
            }
          ]
        })
          .then(function (userPlaces) {
            return userPlaces.map(userPlace => {
              return { userId: userPlace.userId, placeName: userPlace.place.name };
            });
          });
      }
    }
  });

module.exports = UserPlaces;
