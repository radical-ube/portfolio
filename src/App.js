import React from 'react';

import './App.css';
import Canvas from './components/utilities/canvas'
import Routes from './components/routes'
import Navbar from './components/pages/navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        {/* <Canvas /> */}
        <Routes />
        {/* <p>
          Edit <code>src/App.js</code> and save to see a change.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
