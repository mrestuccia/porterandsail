import React from 'react';

const WelcomeUser = ({ info, tags }) => {
  if (!info) return null;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2>{info.name}'s profile</h2>
          <div id="welcome">
            {
              tags.map((item, idx) => (
                <span key={idx} className="pills">{item}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUser;
