import React from 'react';

import './App.css';

import Routes from './components/routes'
import Navbar from './components/navbar'

function App() {
  const backgroundColor = '#282c34'

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bgColor={backgroundColor}/>
        <Routes bgColor={backgroundColor}/>
      </header>
    </div>
  );
}

export default App;
