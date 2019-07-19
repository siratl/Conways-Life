import React from 'react';

class Box extends React.Component {
  selectBox = () => {
    this.props.isClickable
      ? this.props.selectBox(this.props.row, this.props.col)
      : alert('Selection Unavailable, Automaton Playing!');
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

export default Box;
