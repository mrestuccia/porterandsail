import React from 'react';

//Components
import Header from './components/Header';

const App = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default App;
