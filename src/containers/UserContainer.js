import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Welcome from '../components/welcome';
import Favorites from '../components/favorites';
import Recommendations from '../components/recommendations';


// Reducer
import { loadFavoritesUser, loadRecommendationsUser } from '../redux/userReducer';


class UserContainer extends Component {

  componentWillMount() {
    if (!this.props) return;
    this.props.loadFavoritesUser(this.props.params.userId);
    this.props.loadFavoritesUser(this.props.params.userId);
  }


  render() {
    const { favorites, recommendations } = this.props;
    return (
      <div>
        <Welcome />
        <Favorites favorites={favorites} />
        <Recommendations recomendations={recommendations} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return (
    {
      favorites: state.user.favorites,
    }
  );
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      loadFavoritesUser: (id) => dispatch(loadFavoritesUser(id)),
      loadRecommendationsUser: (id) => dispatch(loadRecommendationsUser(id))
    }
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
