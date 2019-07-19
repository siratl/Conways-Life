import React, { Component } from 'react';
import {
  Button,
  DropdownItem,
  ButtonToolbar,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  setActive1 = () => {
    this.props.gridSize(1);
  };

  setActive2 = () => {
    this.props.gridSize(2);
  };

  setActive3 = () => {
    this.props.gridSize(3);
  };

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
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>Grid Size</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.setActive1}>30x30</DropdownItem>
              <DropdownItem onClick={this.setActive2}>40x40</DropdownItem>
              <DropdownItem onClick={this.setActive3}>50x50</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
