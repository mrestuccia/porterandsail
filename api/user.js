const router = require('express').Router();
const models = require('../models').models;


// GET
// User Likes
router.get('/likes/:uId', (req, res, next) => {
  const _userId = req.params.uId;
  console.log('like', _userId);
  models.UserPlaces.findAll({
    include: [
      {
        model: models.Places
      }
    ],
    where: {
      userId: _userId
    }
  })
    .then(userPlaces => {
      res.send(userPlaces);
    })
    .catch(next);
});

module.exports = router;
