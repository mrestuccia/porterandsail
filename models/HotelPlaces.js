const conn = require('./db');

const Place = require('./Place');
const PlaceTags = require('./PlaceTags');
const Tag = require('./Tag');


const HotelPlaces = conn.define('hotelplaces', {
}, {
    classMethods: {
      findByTag: function (hotelId, tagName, arrPlaces) {
        return HotelPlaces.findAll(
          {
            include: [
              {
                model: Place,
                required: true,
                include: [
                  {
                    model: PlaceTags,
                    required: true,
                    include: [
                      {
                        model: Tag,
                        required: true,
                        where: { name: tagName }
                      }
                    ]
                  }
                ]
              }
            ],
            where:
            {
              placeId: { $notIn: arrPlaces },
              hotelId: hotelId
            }
          });
      },
      findByTags: function (hotelId, tags, arrPlaces) {
        return Promise.all(tags.map(tag => this.findByTag(hotelId, tag, arrPlaces)));
      }
    }
  });

module.exports = HotelPlaces;
