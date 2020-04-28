import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import store, { history } from './app/store';
import App from './app/App';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

render()
serviceWorker.unregister();
