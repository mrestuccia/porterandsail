import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer, {loadFavoritesUser} from './userReducer';

const combined = combineReducers({
  user: userReducer
});

/*
 * download the redux devtools chrome extension for this to work - https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
*/
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;

if (reduxDevtools) {
    store = createStore(combined, reduxDevtools(applyMiddleware(thunk)));
} else {
    store = createStore(combined, applyMiddleware(thunk));
}

// Init
//console.log('store', this.props.location.query);
store.dispatch(loadFavoritesUser());

export default store;
