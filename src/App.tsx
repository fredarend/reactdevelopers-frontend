import React from 'react';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

import GlobalStyle from './styles/globals';

const App: React.FC = () => (
  <>
    <Dashboard />
    <GlobalStyle />
  </>
);
export default App;
