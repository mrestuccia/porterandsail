import React from 'react';
import { render } from 'react-dom';

import Header from './components/header';

const root = document.getElementById('root');

const App = () => {
  return (
     <Header />
  );
};

render(<App />, root);
