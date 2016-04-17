// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix_html';

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import reducer from './reducers/root';
import Root from './components/root';

var mount = document.getElementById('app');

if(mount){
  const data = JSON.parse(mount.dataset.sidewalk);
  const store = createStore(reducer, {image:
    Immutable.fromJS({
      // the rest of these should be provided by the model
      width: 500,
      height: 200,
      rows: 50,
      cols: 50,
      grid: _.chunk(data.colors, 50)
    })
  });

  ReactDOM.render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    mount
  );
}
