import React from 'react';
import _ from 'lodash';

export default class Canvas extends React.Component{
  constructor(){
    super();
    var color = '#000000';

    var grid = [];
    _.times(25, ()=> grid.push([]));
    _.each(grid, row => {
      _.times(25, ()=> row.push('#FFFFFF'));
    });

    this.state = {color, grid, mouseDown: false};

  }

  changeColor(color){
    this.setState({color});
  }

  blockClick(x, y){
    this.blockChange(x, y);
  }

  blockEnter(x, y){
    if(this.state.mouseDown){
      this.blockChange(x, y);
    }
  }

  blockChange(x, y){
    this.state.grid[x][y] = this.state.color;
    this.setState({grid: this.state.grid});
  }


  startColor(){
    this.setState({mouseDown: true});
  }

  stopColor(){
    this.setState({mouseDown: false});
  }

  render(){
    return(
      <div>
        <svg width="500" height="500"
          onMouseDown= {()=>this.startColor()}
          onMouseUp=   {()=>this.stopColor()}
          onMouseLeave={()=>this.stopColor()}>
          {_.map(this.state.grid, (row, x) =>
            _.map(row, (block, y) =>
              <rect
                key={`x${x}y${y}`}
                x={x * 20} y={y * 20}
                width="20" height="20"
                style={{fill: block}}
                onMouseDown= {()=> this.blockClick(x, y)}
                onMouseEnter={()=> this.blockEnter(x, y)}/>
            )
          )}
        </svg>
        <br />
        <input type="color" value={this.state.color} onChange={(e)=> this.changeColor(e.target.value)}/>
      </div>
    );
  }
};
