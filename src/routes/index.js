import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../containers/Main';
import MetaMaskNotDetected from '../containers/MetaMaskNotDetected';

const routes = (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/no-metamask" component={MetaMaskNotDetected} />
    <Redirect from="/*" to="/" />
  </Switch>
);

export default routes;
