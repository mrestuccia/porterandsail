import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Welcome from '../components/welcome';
import Favorites from '../components/favorites';
import Recommendations from '../components/recommendations';
import Predictions from '../components/predictions';


// Reducer
import { loadFavoritesUser, loadRecommendationsUser, loadUser, loadPredictionsUser } from '../redux/userReducer';


class UserContainer extends Component {

  componentWillMount() {
    if (!this.props) return;
    this.props.loadUser(this.props.params.userId);
  }


  render() {
    const { favorites, recommendations, predictions, info, tags } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Welcome info={info} tags={tags} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Favorites favorites={favorites} />
          </div>
          <div className="col-md-6">
            <Recommendations recommendations={recommendations} />
          </div>

          <div className="col-md-6">
            <Predictions predictions={predictions} />
          </div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return (
    {
      info: state.user.info,
      tags: state.user.tags,
      favorites: state.user.favorites,
      recommendations: state.user.recommendations,
      predictions: state.user.predictions
    }
  );
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      loadUser: (id) => {
        dispatch(loadUser(id))
          .then(() => dispatch(loadFavoritesUser(id)))
          .then(() => dispatch(loadRecommendationsUser(id)))
          .then(() => dispatch(loadPredictionsUser(id)));
      }
    }
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
