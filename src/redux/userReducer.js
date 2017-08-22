import axios from 'axios';
import store from './store';

// Constants
const LOAD_USER_FAVORITES_SUCCESS = 'LOAD_USER_FAVORITES_SUCCESS';
const LOAD_USER_RECOMMENDATIONS_SUCCESS = 'LOAD_USER_RECOMMENDATIONS_SUCCESS';
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';

// Actions
const loadFavoritesUserSuccess = (favorites) => ({
  type: LOAD_USER_FAVORITES_SUCCESS,
  favorites
});

const loadRecommendationsUserSuccess = (recommendations) => ({
  type: LOAD_USER_RECOMMENDATIONS_SUCCESS,
  recommendations
});

const loadUserSuccess = (client) => ({
  type: LOAD_USER_SUCCESS,
  client
});




// Methods
const loadFavoritesUser = (id) => {
  return (dispatch) => {
    axios.get(`/api/user/${id||1}/likes/1`)
      .then(response => response.data)
      .then(favorites => {
        dispatch(loadFavoritesUserSuccess(favorites));
      })
      .catch(err => console.log(err));
  };
};

const loadRecommendationsUser = (id) => {
  return (dispatch) => {
    axios.get(`/api/user/${id||1}/recommendations/1`)
      .then(response => response.data)
      .then(recommendations => {
        dispatch(loadRecommendationsUserSuccess(recommendations));
      })
      .catch(err => console.log(err));
  };
};

const loadUser = (id) => {
  return (dispatch) => {
    axios.get(`/api/user/${id||1}`)
      .then(response => response.data)
      .then(client => {
        dispatch(loadUserSuccess(client));
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
    case LOAD_USER_RECOMMENDATIONS_SUCCESS:
      console.log('LOAD_USER_RECOMENDATIONS_SUCCESS', action.recommendations);
      return { ...state, recommendations: action.recommendations }
    case LOAD_USER_SUCCESS:
      console.log('LOAD_USER_SUCCESS', action.client);
      return { ...state, ...action.client }
  }
  return state
};


export {
  loadFavoritesUser, 
  loadRecommendationsUser,
  loadUser
};

export default userReducer;