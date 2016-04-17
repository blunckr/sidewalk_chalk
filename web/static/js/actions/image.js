export const UPDATE_BLOCK_COLOR = 'UPDATE_BLOCK_COLOR';

export const updateBlockColor = (y, x, color)=>{
  return {y, x, color, type: UPDATE_BLOCK_COLOR};
};
