const router = require('express').Router();
const models = require('../models').models;

// Class Recommendation using tagging evaluation
const Recommendations = require('./class/recommendations');

// Class jsRecommender using collaborative filtering
const Collaborative = require('js-recommender');


// GET
// Get the user and his tags
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  let recommend;

  // Find the user
  models.User.findById(userId)
    .then(user => {
      // Get the user tags
      models.UserPlaces.getPlacesAndTagsByUser(user.id)
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
  models.UserPlaces.getPlacesAndTagsByUser(_userId)
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


// GET
// Recommendations using collaborative filtering
// /user
router.get('/:userId/predictions/:hotelId', (req, res, next) => {
  const userId = req.params.userId;
  const hotelId = req.params.hotelId;
  const recommender = new Collaborative.Recommender();

  var table = new Collaborative.Table();

  models.UserPlaces.getAllUserAndPlacesByHotel(hotelId)
    .then(userPlaces => {
      // Create a table of places and all users -> Set score to 1
      userPlaces.forEach(userPlace => {
        table.setCell(userPlace.placeName, "'" + userPlace.userId + "'", 1);
      });

      // Create the model using gradient desent
      let model = recommender.fit(table);

      // Transform the remaining using a collaborative filtering
      let predicted = recommender.transform(table);

      // Transform the user as string
      let user = "'" + userId + "'";

      // Create an array with an object and all the predictions
      let arrPlace = [];
      for (var j = 0; j < predicted.rowNames.length; ++j) {
        var place = predicted.rowNames[j];
        if (!table.getCell(place, user)) {
          arrPlace.push({ place: place, actual: table.getCell(place, user), predicted: predicted.getCell(place, user) });
        }
      }

      // Sort by biggest probability to be 1
      arrPlace.sort(function (item1, item2) {
        return item2.predicted - item1.predicted;
      });


      // Get back the places with their tags
      return Promise.all((arrPlace.map(item => {
        return models.Place.placeByName(item.place);
      })));

    })
    .then(suggestedPlace => {
      // Send only the first 5
      res.send(suggestedPlace.slice(0, 5));
    });
});


module.exports = router;
