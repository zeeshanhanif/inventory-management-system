import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store'
import routes from './routes'
import './index.css';
import './config'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
/*
ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
  ),
  document.getElementById('root')
);
*/

ReactDOM.render((
    <Provider store={store}>
        {routes}
    </Provider>
  ),
  document.getElementById('root')
);
