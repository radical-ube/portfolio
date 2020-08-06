import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/canvas'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Canvas />
        <p>
          Edit <code>src/App.js</code> and save to see a change.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
