import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import Main from '../containers/Main';
import MirrorSwapContract from '../containers/MirrorSwapContract';
import { history } from '../app/store';

const routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/fill/:contractAddress" component={MirrorSwapContract} />
      <Redirect from="/*" to="/" />
    </Switch>
  </ConnectedRouter>
);

export default routes;
