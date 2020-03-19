import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import store, { history } from './app/store';
import App from './app/App';
import './index.css';

const render = () => {
  ReactDOM.render(
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('root')
  )
}

render()
serviceWorker.unregister();
