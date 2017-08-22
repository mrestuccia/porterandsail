const router = require('express').Router();
const models = require('../models').models;
const { statWords, sortObject } = require('./utils');
const Recommendations = require('./recommendations');


// GET
// Get the user and his tags
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;

  // Find the user
  models.User.findById(userId)
    .then(user => {
      // Get the user tags
      models.UserPlaces.getAllUserPlacesAndTags(user.id)
        .then(userPlacesAndTags => {

          let wordFrequencySorted = sortObject(statWords(userPlacesAndTags.tags));
          // Send back the user and the tags
          res.send({ info: user, tags: wordFrequencySorted });
        });
    });
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

      // Create the recomendation class and the tags and user likes
      recommend = new Recommendations(userPlacesAndTags);

      // Return the hotel places that match those tags
      return models.HotelPlaces.findByTags(_hotelId, recommend.getSortedTags(), recommend.getPlaces());
    })
    .then(hotelPlaces => {

      // Set the places on the class recommend and sort by repetition
      recommend.setHotelPLaces(hotelPlaces);

      // Send the firt 5
      res.send(recommend.getHotelPlaces().slice(0, 5));
    });
});

module.exports = router;
