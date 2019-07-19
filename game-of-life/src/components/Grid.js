import React from 'react';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const width = this.props.cols * 14;
    let rowsArr = [];

    let boxClass = '';
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        const boxId = i + '_' + j;

        boxClass = this.props.gridFull[i][j] ? 'box alive' : 'box dead';
        rowsArr.push(
          <Box boxClass={boxClass} key={boxId} boxId={boxId} row={i} col={j} selectBox={this.props.selectBox} />,
        );
      }
    }

    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;
