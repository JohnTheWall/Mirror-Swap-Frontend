import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import store, { history } from './app/store';
import App from './app/App';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme'

const render = () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  )
}

render()
serviceWorker.unregister();
