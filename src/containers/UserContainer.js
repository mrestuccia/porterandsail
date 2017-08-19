import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Welcome from '../components/welcome';
import Favorites from '../components/favorites';

// Reducer
import { loadFavoritesUser } from '../redux/userReducer';


class UserContainer extends Component {

  componentWillMount() {
    if (!this.props) return;
    console.log('component will mount', this.props);
    this.props.loadFavoritesUser(this.props.params.userId);
  }


  render() {
    const { favorites } = this.props;
    return (
      <div>
        <Welcome />
        <Favorites favorites={favorites} />
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
      loadFavoritesUser: (id) => dispatch(loadFavoritesUser(id))
    }
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
