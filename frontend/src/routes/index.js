import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../containers/Main';
import MirrorSwapContract from '../containers/MirrorSwapContract';
import Fill from '../components/Fill';
import { history } from '../app/store';
import { ConnectedRouter } from 'connected-react-router';

const routes = (
  <Switch>
    <ConnectedRouter history={history}>
      <Route exact path="/swap" component={Main} />
      <Route exact path="/fill" component={Fill} />
      <Route exact path="/fill/:contractAddress" component={MirrorSwapContract} />
      <Redirect from="/*" to="/swap" />
    </ConnectedRouter>
  </Switch>
);

export default routes;
