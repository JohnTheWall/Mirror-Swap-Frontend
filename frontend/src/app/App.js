import React, { useState } from 'react';
import routes from '../routes';
import { startSaga } from './rootSaga';
import { connect } from 'react-redux';
import Snackbars from '../components/SnackBars';
import { setClose } from '../containers/Notifications/reducer';
import { connectMetamask } from '../containers/Metamask/reducer'
import { push } from 'connected-react-router'
import { Grid, Box, makeStyles } from '@material-ui/core';
import NavigationTabs from '../components/NavigationTabs';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import styled from 'styled-components'

const useStyles = makeStyles(theme => ({
  swapButtonContainer: {
    padding: '10px',
    display: 'table',
    margin: 'auto',
  },
  swapButton: {
    background: '#eee',
    color: '#000 !important',
  },
  customPaper: {
    padding: theme.spacing(2),
  },
}));

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const App = (props) => {
  const { setClose, isAvailable, connectMetamask, user } = props
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const classes = useStyles();

  return (
    <React.Fragment>
      <Snackbars {...props.notifications} setClose={setClose} />
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Box m={4}>
        <Grid container justify="center">
          <Grid item xs={10} sm={5}>
            <BrowserRouter>
              <NavigationTabs />
              {routes}
            </BrowserRouter>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
};

const matchDispatchToProps = {
  setClose,
  connectMetamask,
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
