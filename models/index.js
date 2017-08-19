const faker = require('faker');
const path = require('path');

const conn = require('./db');

const Hotel = require('./Hotel');
const HotelPlaces = require('./HotelPlaces');

const Place = require('./Place');
const PlaceTags = require('./PlaceTags');

const Tag = require('./Tag');

const User = require('./User');
const UserPlaces = require('./UserPlaces');

// User Places
UserPlaces.belongsTo(User, { onDelete: 'CASCADE' });
UserPlaces.belongsTo(Place, { onDelete: 'CASCADE' });
User.hasMany(UserPlaces);
Place.hasMany(UserPlaces);


// Hotel Places
HotelPlaces.belongsTo(Hotel, { onDelete: 'CASCADE' });
HotelPlaces.belongsTo(Place, { onDelete: 'CASCADE' });
Hotel.hasMany(HotelPlaces);
Place.hasMany(HotelPlaces);


// Place Tags
PlaceTags.belongsTo(Place, { onDelete: 'CASCADE' });
PlaceTags.belongsTo(Tag, { onDelete: 'CASCADE' });
Place.hasMany(PlaceTags);
Tag.hasMany(PlaceTags);


const seed = () => {
  let users = [], places = [], tags = [];
  let userPlaces = [], placesTags = [], hotelPlaces = [];
  let numUsers = 50;
  let numPlaces = 1000;
  let numTags = 100;
  let numTagsPlaces = 5;
  let numUserPlaces = 5;

  return sync()
    .then(() => {
      for (let i = 0; i < numUsers; i++) {
        users.push(User.create({ name: faker.name.firstName() }));
      }
      return Promise.all(users);
    })
    .then(() => {
      // Declare places
      for (let i = 0; i < numPlaces; i++) {
        places.push(Place.create({ name: faker.commerce.productName() }));
      }
      return Promise.all(places);
    })
    .then(() => {
      //Declare tags
      for (let i = 0; i < numTags; i++) {
        tags.push(Tag.create({ name: faker.lorem.word() }));
      }
      return Promise.all(tags);
    })
    .then(() => {
      // Create Hotels (just one for now)
      return Hotel.create({ name: 'Hotel Americano' });
    })
    .then(hotel => {
      // Add Hotel to Places
      for (let i = 0; i < numPlaces; i++) {
        hotelPlaces.push(HotelPlaces.create({ placeId: i + 1, hotelId: hotel.id }));
      }
      return Promise.all(hotelPlaces);
    })
    .then(() => {
      // Add Tags to Places
      for (let i = 0; i < numPlaces; i++) {
        for (let j = 0; j < numTagsPlaces; j++) {
          const tagId = Math.floor(Math.random() * (numTags - 1)) + 1;
          placesTags.push(PlaceTags.create({ placeId: i + 1, tagId: tagId }));
        }
      }
      return Promise.all(placesTags);
    })
    .then(() => {
      // Add User to Places (likes)
      for (let i = 0; i < numUsers; i++) {
        for (let j = 0; j < numUserPlaces; j++) {
          const tagId = Math.floor(Math.random() * (numPlaces - 1)) + 1;
          userPlaces.push(UserPlaces.create({ userId: i + 1, tagId: tagId }));
        }
      }
      return Promise.all(userPlaces);
    });


};

const sync = () => conn.sync({ force: true });

module.exports = {
  models: {
    Hotel,
    HotelPlaces,
    Place,
    PlaceTags,
    Tag,
    User,
    UserPlaces
  },
  sync,
  seed
};
