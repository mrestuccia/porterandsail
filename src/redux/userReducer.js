import axios from 'axios';
import store from './store';

// Constants
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
const LOAD_USER_FAVORITES_SUCCESS = 'LOAD_USER_FAVORITES_SUCCESS';
const LOAD_USER_RECOMMENDATIONS_SUCCESS = 'LOAD_USER_RECOMMENDATIONS_SUCCESS';
const LOAD_USER_PREDICTIONS_SUCCESS = 'LOAD_USER_PREDICTIONS_SUCCESS';


// Actions
const loadUserSuccess = (client) => ({
  type: LOAD_USER_SUCCESS,
  client
});

const loadFavoritesUserSuccess = (favorites) => ({
  type: LOAD_USER_FAVORITES_SUCCESS,
  favorites
});

const loadRecommendationsUserSuccess = (recommendations) => ({
  type: LOAD_USER_RECOMMENDATIONS_SUCCESS,
  recommendations
});

const loadPredictionsUserSuccess = (predictions) => ({
  type: LOAD_USER_PREDICTIONS_SUCCESS,
  predictions
});

// Methods
const loadUser = (id) => {
  return (dispatch) => {
    return axios.get(`/api/user/${id||1}`)
      .then(response => response.data)
      .then(client => {
        dispatch(loadUserSuccess(client));
      })
      .catch(err => console.log(err));
  };
};

const loadFavoritesUser = (id) => {
  return (dispatch) => {
    return axios.get(`/api/user/${id||1}/likes/1`)
      .then(response => response.data)
      .then(favorites => {
        dispatch(loadFavoritesUserSuccess(favorites));
      })
      .catch(err => console.log(err));
  };
};

const loadRecommendationsUser = (id) => {
  return (dispatch) => {
    return axios.get(`/api/user/${id||1}/recommendations/1`)
      .then(response => response.data)
      .then(recommendations => {
        dispatch(loadRecommendationsUserSuccess(recommendations));
      })
      .catch(err => console.log(err));
  };
};

const loadPredictionsUser = (id) => {
  return (dispatch) => {
    axios.get(`/api/user/${id||1}/predictions/1`)
      .then(response => response.data)
      .then(predictions => {
        dispatch(loadPredictionsUserSuccess(predictions));
      })
      .catch(err => console.log(err));
  };
};


// Reducer
const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return { ...state, ...action.client }
    case LOAD_USER_FAVORITES_SUCCESS:
      return { ...state, favorites: action.favorites }
    case LOAD_USER_RECOMMENDATIONS_SUCCESS:
      return { ...state, recommendations: action.recommendations }
    case LOAD_USER_PREDICTIONS_SUCCESS:
      return { ...state, predictions: action.predictions }
  
  }
  return state
};

export {
  loadUser,
  loadFavoritesUser, 
  loadRecommendationsUser,
  loadPredictionsUser
};

export default userReducer;