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
      isClickable: true,
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
    this.setState({ isPaused: false, isClickable: false });
    clearInterval(this.intervalId);
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
    this.setState({ isPaused: true, isClickable: true });
  };

  slow = () => {
    this.speed = this.speed >= 5300 ? 5300 : this.speed + 1000;
    this.playBtn();
  };

  fast = () => {
    this.speed = this.speed <= 300 ? 300 : this.speed - 1000;
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
      isClickable: true,
    });
    this.speed = 300;
  };

  gridSize = size => {
    console.log(size);
    switch (size) {
      case 1:
        this.cols = 30;
        this.rows = 30;
        break;
      case 2:
        this.cols = 40;
        this.rows = 40;
        break;
      default:
        this.cols = 50;
        this.rows = 50;
    }
    this.clear();
  };

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
          isClickable={this.state.isClickable}
        />
        <Buttons
          playBtn={this.playBtn}
          pauseBtn={this.pauseBtn}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
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

          <section className="part2">
            <h3>About the Algorithm</h3>
            <p>
              The "Game of Life" is a cellular automaton formulated by John
              Horton Conway in 1970. He was a British mathematician that
              postulated several theories including number theory and coding
              theory. The game is a zero-player game, meaning that its evolution
              is determined by its initial state, requiring no further input.
              <p>
                Conway chose the rules above carefully, after considerable
                experimentation, to meet the criteria:
                <ol>
                  <li>There should be no explosive growth.</li>
                  <li>
                    There should exist small initial patterns with chaotic,
                    unpredictable outcomes.
                  </li>
                  <li>
                    There should be potential for von Neumann universal
                    constructors.
                  </li>
                  <li>
                    The rules should be as simple as possible, whilst adhering
                    to the above constraints.
                  </li>
                </ol>
              </p>
              For more information about the Algorithm of Conways "Game of Life"{' '}
              <a
                href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns"
                rel="noopener noreferrer"
                target="_blank"
              >
                Wikipedia
              </a>{' '}
              has a great resource
            </p>
          </section>
        </section>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
