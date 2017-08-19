import React from 'react';

const HotelFavorites = ({ favorites }) => {

  console.log('HotelFavorites=>', favorites);


  if (!favorites) return null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Favorites</h3>
          <ul>
            {
              favorites.map(favorite => (
                <li key={favorite.id}>
                  {favorite.place.name}
                  <div id="tags">
                    {
                      favorite.place.placetags.map(placetag => (
                        '#' + placetag.tag.name
                      )).join(' ')
                    }
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelFavorites;

