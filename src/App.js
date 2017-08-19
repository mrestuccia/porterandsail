import React from 'react';

//Components
import Header from './components/header';

const App = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default App;
