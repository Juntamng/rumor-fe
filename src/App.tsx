// import React from 'react';
import './App.css';
import SearchProvider from './components/contexts/SearchProvider';
import Main from './pages/Main';

function App() {
  return (
    <SearchProvider>
      <Main />
    </SearchProvider>
  );
}

export default App;
