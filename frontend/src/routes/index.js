import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../containers/Main';

const routes = (
  <Switch>
    <Route exact path="/" component={Main} />
    <Redirect from="/*" to="/" />
  </Switch>
);

export default routes;
