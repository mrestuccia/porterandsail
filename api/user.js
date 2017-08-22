const router = require('express').Router();
const models = require('../models').models;
const { statWords, sortObject } = require('./utils');
const Recommendations = require('./recommendations');


// GET
// Get the user and his tags
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  let recommend;

  // Find the user
  models.User.findById(userId)
    .then(user => {
      // Get the user tags
      models.UserPlaces.getAllUserPlacesAndTags(user.id)
        .then(userPlacesAndTags => {

          recommend = new Recommendations(userPlacesAndTags);

          // Send back the user and the tags
          res.send({ info: user, tags: recommend.getTags() });
        });
    })
    .catch(next);
});

// GET
// User Likes on a given Hotel
router.get('/:userId/likes/:hotelId', (req, res, next) => {
  const _userId = req.params.userId;
  const _hotelId = req.params.hotelId;

  // Get the Places that the User Selected for a give Hotel
  models.UserPlaces.getUserPlacesByHotel(_userId, _hotelId)
    .then(userPlaces => {
      res.send(userPlaces);
    })
    .catch(next);
});

// GET
// Recommendations for User on a given Hotel
router.get('/:userId/recommendations/:hotelId', (req, res, next) => {
  const _userId = req.params.userId;
  const _hotelId = req.params.hotelId;
  let recommend;

  // Create a list of tags sorted by repetition.
  models.UserPlaces.getAllUserPlacesAndTags(_userId)
    .then(userPlacesAndTags => {

      // Create the recomendation classs and pass the tags and user places
      recommend = new Recommendations(userPlacesAndTags);
      return models.HotelPlaces.findByTags(_hotelId, recommend.getSortedTags(), recommend.getPlaces());
    })
    .then(hotelPlaces => {
      recommend.setHotelPLaces(hotelPlaces);
      return recommend.getHotelPlaces();
    })
    .then(hotelPlaces => {

      // Get back the places with their tags
      return Promise.all((hotelPlaces.map(item => {
        return models.Place.placeByName(item);
      })));
    })
    .then(recomendedPlace => {
      // Send only the first 5
      res.send(recomendedPlace.slice(0, 5));
    })
    .catch(next);
});

module.exports = router;
