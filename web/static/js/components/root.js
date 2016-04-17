import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Grid from './grid';

class Root extends React.Component{
  constructor(props){
    super(props);

    var color = '#000000';

    const grid = _.chunk(props.image.colors, props.image.cols);

    this.state = {color, grid, mouseDown: false};

    this.startColor = this.startColor.bind(this);
    this.stopColor  = this.stopColor.bind(this);
    this.blockEnter = this.blockEnter.bind(this);
    this.blockClick = this.blockClick.bind(this);
  }

  changeColor(color){
    this.setState({color});
  }

  blockClick(y, x){
    this.blockChange(y, x);
  }

  blockEnter(y, x){
    if(this.state.mouseDown){
      this.blockChange(y, x);
    }
  }

  blockChange(y, x){
    this.state.grid[y][x] = this.state.color;
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
        <Grid
          grid       ={this.state.grid}
          startColor ={this.startColor}
          stopColor  ={this.stopColor}
          blockClick ={this.blockClick}
          blockEnter ={this.blockEnter}
          width      ={this.props.image.width}
          height     ={this.props.image.height}
          />
        <br />
        <input type="color" value={this.state.color} onChange={(e)=> this.changeColor(e.target.value)}/>
      </div>
    );
  }
};

var stateToProps = (state) => {
  return {image: state.image};
};

export default connect(stateToProps)(Root);
