const router = require('express').Router();
const models = require('../models').models;

// AUX FUNCTIONS, MOVE ONCE DONE

// Auxiliar Functions
let statWords = (matchedWords) => {
  return matchedWords.reduce((stats, word) => {
    if (stats.hasOwnProperty(word)) {
      stats[word] = stats[word] + 1;
    } else {
      stats[word] = 1;
    }
    return stats;
  }, {});
};

const sortObject = (obj) => {
  var sortable = [];
  for (var word in obj) {
    sortable.push([word, obj[word]]);
  }

  return sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
};

const findPlace = (hotelId, tagName, arrPlaces) => {
  return models.HotelPlaces.findAll(
    {
      include: [
        {
          model: models.Place,
          required: true,
          include: [
            {
              model: models.PlaceTags,
              required: true,
              include: [
                {
                  model: models.Tag,
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
};


// GET
// User Likes on a given hotel
router.get('/:userId/likes/:hotelId', (req, res, next) => {
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

// Recommendations for User on a given hotel
router.get('/:userId/recommend/:hotelId', (req, res, next) => {
  const _userId = req.params.userId;
  const _hotelId = req.params.hotelId;

  // Create a list of tags sorted by repetition.
  // Get the Places of the user
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
      var arrTags = [];
      var arrUserPlaces = {};
      userPlaces.forEach(userPlace => {
        arrUserPlaces[userPlace.place.name] = userPlace.place;
        userPlace.place.placetags.forEach(placetags => {
          arrTags.push(placetags.tag.name);
        });
      });

      var objWords = statWords(arrTags);
      var objSorted = sortObject(objWords);

      // Find places related to the hotel by tag sorted by weight
      var arrResult = objSorted.map(tagName => {
        console.log(tagName[0]);
        return findPlace(_hotelId, tagName[0], arrUserPlaces);
      });

      Promise.all(arrResult)
        .then(arr => {
          let hotelPlaces = {};
          let recomendedPlace = arr.map(item => {
            hotelPlaces[item[0].place.name] = item[0].place;
            return item[0].place.name;
          });
          recomendedPlace = sortObject(statWords(recomendedPlace));

          recomendedPlace = recomendedPlace.map(item => hotelPlaces[item[0]]);
          res.send(recomendedPlace);
        });
    });
});


module.exports = router;
