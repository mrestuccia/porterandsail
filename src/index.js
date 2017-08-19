import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store';

// Containers
import App from './App';
import UserContainer from './containers/UserContainer';

const root = document.getElementById('root');

const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect from="/" to="user/1" />
        <Route path="user/:userId" component={UserContainer} />
      </Route>
    </Router>
  </Provider>
);

render(routes, root);
