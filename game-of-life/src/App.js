import React from 'react';
import './App.css';

import Grid from './components/Grid.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      generation: 0,
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header">Game of Life</h1>
        <Grid />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
