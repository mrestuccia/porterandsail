const router = require('express').Router();
const models = require('../models').models;
const { statWords, sortObject } = require('./utils');


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

  // Create a list of tags sorted by repetition.
  models.UserPlaces.getAllUserPlacesAndTags(_userId)
    .then(userPlacesAndTags => {

      // Find all the tags and their frequency sorted
      let wordFrequencySorted = sortObject(statWords(userPlacesAndTags.tags));

      // Map Hotel Places with those tags
      return Promise.all(wordFrequencySorted.map(tagName => {
        return models.HotelPlaces.findByTag(_hotelId, tagName[0], userPlacesAndTags.places);
      }));
    })
    .then(arr => {
      // Extact the Place Names
      let recomendedPlace = arr.map(item => {
        return item[0].place.name;
      });

      // Count Words frequency and Sort
      recomendedPlace = sortObject(statWords(recomendedPlace));

      // Get back the places with their tags
      return Promise.all((recomendedPlace.map(item => {
        return models.Place.placeByName(item[0]);
      })));
    })
    .then(recomendedPlace => {
      // Send only the first 5
      res.send(recomendedPlace.slice(0, 5));
    });
});

module.exports = router;
