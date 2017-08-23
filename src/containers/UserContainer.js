import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Welcome from '../components/welcome';
import Favorites from '../components/favorites';
import Recommendations from '../components/recommendations';


// Reducer
import { loadFavoritesUser, loadRecommendationsUser, loadUser } from '../redux/userReducer';


class UserContainer extends Component {

  componentWillMount() {
    if (!this.props) return;
    this.props.loadAll(this.props.params.userId);
  }


  render() {
    const { favorites, recommendations, info, tags } = this.props;
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
      recommendations: state.user.recommendations
    }
  );
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      loadAll: (id) => {
        dispatch(loadUser(id))
          .then(() => dispatch(loadFavoritesUser(id)))
          .then(() => dispatch(loadRecommendationsUser(id)));
      }
    }
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
