import _ from 'lodash';

import * as ImageActions from '../actions/image';

export default (state={}, action) => {
  switch(action.type){
  case ImageActions.UPDATE_BLOCK_COLOR:
    console.log('THIS ONE');
    break;
  }

  return state;
};
