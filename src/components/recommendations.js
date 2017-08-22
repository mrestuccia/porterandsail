import React from 'react';

const HotelRecommendation = ({ recommendations }) => {

  if (!recommendations) return null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Recommendations</h3>
          <ul>
            {
              recommendations.map(recomended => (
                <li key={recomended.id}>
                  {recomended.name}
                  <div id="tags">
                    {
                      recomended.placetags.map(placetag => (
                        <span className="pills"> {placetag.tag.name} </span>
                      ))
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

export default HotelRecommendation;

