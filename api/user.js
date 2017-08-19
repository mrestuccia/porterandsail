const router = require('express').Router();
const models = require('../models').models;


// GET
// User Likes
router.get('/:userId/hotellikes/:hotelId', (req, res, next) => {
  const _userId = req.params.userId;
  const _hotelId = req.params.hotelId;

  // Get the Places of the user
  models.UserPlaces.findAll({
    include: [
      {
        model: models.Place,
        include: [
          {
            model: models.PlaceTags,
            include: [
              { model: models.Tag }
            ]
          },
          {
            model: models.HotelPlaces,
            where: { hotelId: _hotelId }
          }
        ]
      }
    ],
    where: {
      userId: _userId
    }
  })
    .then(userPlaces => {
      //  Filter by the hotel and send back
      res.send(userPlaces.filter(place => place.place !== null));
    })
    .catch(next);
});

module.exports = router;
