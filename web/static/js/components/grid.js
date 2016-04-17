import React from 'react';
import _ from 'lodash';

export default (props)=>{

  return (
    <svg width={props.width} height={props.height}
      onMouseDown= {props.startColor}
      onMouseUp=   {props.stopColor}
      onMouseLeave={props.stopColor}>
      {_.map(props.grid, (row, y) =>
        _.map(row, (color, x) =>
          <rect
            key={`x${x}y${y}`}
            x={x * 10} y={y * 10}
            width="10" height="10"
            style={{fill: color}}
            onMouseDown= {()=>props.blockClick(y, x)}
            onMouseEnter={()=>props.blockEnter(y, x)}/>
        )
      )}
    </svg>
  );
};
