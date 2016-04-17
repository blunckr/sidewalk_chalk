import _ from 'lodash';
import Immutable from 'immutable';

import * as ImageActions from '../actions/image';

export default (state={}, action) => {
  switch(action.type){
  case ImageActions.UPDATE_BLOCK_COLOR:
    return state.setIn(['grid', action.y, action.x], action.color);
  }

  return state;
};
