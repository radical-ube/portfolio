import React from 'react';

import './App.css';

import Routes from './components/routes'
import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Routes />
      </header>
    </div>
  );
}

export default App;
