import axios from 'axios';
import store from './store';

// Constants
const LOAD_USER_FAVORITES_SUCCESS = 'LOAD_USER_SUCCESS';


// Actions
const loadFavoritesUserSuccess = (favorites) => ({
  type: LOAD_USER_FAVORITES_SUCCESS,
  favorites
});


// Methods
const loadFavoritesUser = (id) => {
  return (dispatch) => {
    axios.get(`/api/user/${id||1}/hotellikes/1`)
      .then(response => response.data)
      .then(favorites => {
        dispatch(loadFavoritesUserSuccess(favorites));
      })
      .catch(err => console.log(err));
  };
};



// Reducer
const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_FAVORITES_SUCCESS:
      console.log('LOAD_USER_FAVORITES_SUCCESS', action.favorites);
      return { ...state, favorites: action.favorites }
  }
  return state
};


export {
  loadFavoritesUser
};

export default userReducer;