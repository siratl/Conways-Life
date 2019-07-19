import React from 'react';
import './App.css';

import Grid from './components/Grid.js';
import Buttons from './components/Buttons';

class App extends React.Component {
  constructor() {
    super();
    this.speed = 300;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      isPaused: false,
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playBtn = () => {
    this.intervalId = setInterval(this.play, this.speed);
  };

  play = () => {
    let grid1 = this.state.gridFull;
    let grid2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;

        if (i > 0) if (grid1[i - 1][j]) count++;
        if (i > 0 && j > 0) if (grid1[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (grid1[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (grid1[i][j + 1]) count++;
        if (j > 0) if (grid1[i][j - 1]) count++;
        if (i < this.rows - 1) if (grid1[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (grid1[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (grid1[i + 1][j + 1]) count++;
        if (grid1[i][j] && (count < 2 || count > 3)) grid2[i][j] = false;
        if (!grid1[i][j] && count === 3) grid2[i][j] = true;
      }
    }
    this.setState({
      gridFull: this.state.isPaused ? this.state.gridFull : grid2,
      generation: this.state.isPaused
        ? this.state.generation
        : this.state.generation === 3000
        ? this.state.generation
        : this.state.generation + 1,
    });
  };

  pauseBtn = () => {
    clearInterval(this.intervalId);
    this.setState({ isPaused: !this.state.isPaused });
  };

  slow = () => {
    this.speed = 1000;
    this.playBtn();
  };

  fast = () => {
    this.speed = 300;
    this.playBtn();
  };

  clear = () => {
    clearInterval(this.intervalId);
    let grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0,
    });
    this.speed = 300;
  };

  componentDidMount() {
    this.seed();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header">Conway's Game of Life</h1>

        <h4>Generations: {this.state.generation}</h4>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <Buttons
          playBtn={this.playBtn}
          pauseBtn={this.pauseBtn}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
        />
        <section className="rules">
          <hr
            style={{
              backgroundColor: 'white',
              height: 1,
            }}
          />
          <h3>Rules</h3>
          <ol>
            <li>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with three live neighbours becomes a live cell, as
              if by reproduction.
            </li>
          </ol>
        </section>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
