import React from 'react';
import routes from '../routes';
import { startSaga } from './rootSaga';
import { connect } from 'react-redux';
import Snackbars from '../components/SnackBars';
import { setClose } from '../containers/Notifications/reducer';
import { push, ConnectedRouter } from 'connected-react-router'
import { Grid, Box } from '@material-ui/core';
import NavigationTabs from '../components/NavigationTabs';
import { history } from '../app/store';
import Header from '../components/Header';

const App = (props) => {
  const tabs = [{ label: "Swap", path: "/swap" }, { label: "Fill", path: "/fill" }]
  return (
    <React.Fragment>
      <Snackbars {...props.notifications} setClose={setClose} />
      <Header />
      <Box m={4}>
        <Grid container justify="center">
          <Grid item xs={10} sm={5}>
            <ConnectedRouter history={history}>
              <NavigationTabs
                tabs={tabs} />
              {routes}
            </ConnectedRouter>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
};

const matchDispatchToProps = {
  setClose,
  push,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  user: state.user,
  currencies: state.currency.currencies,
  isAvailable: state.metamask.isAvailable
});

const WrappedComponent = connect(mapStateToProps, matchDispatchToProps)(App);

export default () => {
  startSaga();
  return <WrappedComponent />
};
