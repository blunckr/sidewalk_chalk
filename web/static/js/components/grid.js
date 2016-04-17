import React from 'react';
import _ from 'lodash';

export default (props)=>{
  const blockHeight = props.height / props.grid.size;
  const blockWidth  = props.width  / props.grid.first().size;
  return (
    <svg width={props.width} height={props.height}
      onMouseDown= {props.startColor}
      onMouseUp=   {props.stopColor}
      onMouseLeave={props.stopColor}>
      {props.grid.map((row, y) =>
        row.map((color, x) =>
          <rect
            key={`x${x}y${y}`}
            x={x * blockWidth} y={y * blockHeight}
            width={blockWidth} height={blockHeight}
            style={{fill: color}}
            onMouseDown= {()=>props.blockClick(y, x)}
            onMouseEnter={()=>props.blockEnter(y, x)}/>
        )
      )}
    </svg>
  );
};
