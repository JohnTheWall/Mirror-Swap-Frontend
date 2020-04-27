import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../containers/Main';
import MirrorSwapContract from '../containers/MirrorSwapContract';
import Fill from '../containers/Fill';

const routes = (
  <Switch>
      <Route exact path="/swap" component={Main} />
      <Route exact path="/fill" component={Fill} />
      <Route exact path="/fill/:contractAddress" component={MirrorSwapContract} />
      <Redirect from="/*" to="/swap" />
  </Switch>
);

export default routes;
