import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <Button
            color="secondary"
            size="sm"
            className="btn"
            onClick={this.props.playBtn}
          >
            Play
          </Button>
          <Button
            color="secondary"
            size="sm"
            className="btn"
            onClick={this.props.pauseBtn}
          >
            Pause
          </Button>
          <Button
            color="secondary"
            size="sm"
            className="btn"
            onClick={this.props.slow}
          >
            Slow
          </Button>
          <Button
            color="secondary"
            size="sm"
            className="btn"
            onClick={this.props.fast}
          >
            Fast
          </Button>
          <Button
            color="secondary"
            size="sm"
            className="btn"
            onClick={this.props.clear}
          >
            Clear
          </Button>
          <Button
            color="secondary"
            size="sm"
            className="btn"
            onClick={this.props.seed}
          >
            Seed
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
