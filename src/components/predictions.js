import React from 'react';

const HotelPrediction = ({ predictions }) => {

  if (!predictions) return null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Predictions</h3>
          <ul>
            {
              predictions.map(predicted => (
                <li key={predicted.id}>
                  {predicted.name}
                  <div id="tags">
                    {
                      predicted.placetags.map(placetag => (
                        <span key={`hp${placetag.tag.id}`} className="pills"> {placetag.tag.name} </span>
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

export default HotelPrediction;

