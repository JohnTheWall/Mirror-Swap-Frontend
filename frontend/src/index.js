import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import store from './app/store';
import App from './app/App';
import './index.css';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
serviceWorker.unregister();
