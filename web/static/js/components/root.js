import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Grid from './grid';
import * as ImageActions from '../actions/image';
import Socket from '../socket';

class Root extends React.Component{
  constructor(props){
    super(props);

    var color = '#000000';

    this.socket = new Socket(props.image.get('id'), props.updateBlockColor);

    this.state = {color, mouseDown: false};

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
    this.socket.pushColor(y, x, this.state.color, this.props.image.get('cols'));
    this.props.updateBlockColor(y, x, this.state.color);
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
          grid       ={this.props.image.get('grid')}
          width      ={this.props.image.get('width')}
          height     ={this.props.image.get('height')}
          startColor ={this.startColor}
          stopColor  ={this.stopColor}
          blockClick ={this.blockClick}
          blockEnter ={this.blockEnter}
          />
        <br />
        <input type="color" value={this.state.color} onChange={(e)=> this.changeColor(e.target.value)}/>
      </div>
    );
  }
};

const stateToProps = (state)=>{
  return {image: state.image};
};

export default connect(stateToProps, ImageActions)(Root);
