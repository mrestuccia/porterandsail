const conn = require('./db');

const PlaceTags = require('./PlaceTags');
const Tag = require('./Tag');

const Place = conn.define('place',
    {
        name: { type: conn.Sequelize.STRING }
    },
    {
        classMethods: {
            placeByName: (placeName) => {
                return Place.findOne(
                    {
                        include: [{
                            model: PlaceTags,
                            include: [{ model: Tag }]
                        }],
                        where:
                        {
                            name: placeName
                        }
                    });
            }
        }
    });

module.exports = Place;
