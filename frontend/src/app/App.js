import React, { useState } from 'react';
import routes from '../routes';
import { startSaga } from './rootSaga';
import { connect } from 'react-redux';
import Snackbars from '../components/SnackBars';
import { setClose } from '../containers/Notifications/reducer';
import { connectMetamask } from '../containers/Metamask/reducer'
import Header from '../components/Header/'
import DialogBox from '../components/Dialog'

const App = (props) => {
  const { setClose, isAvailable, connectMetamask, user } = props
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <React.Fragment>
      <Snackbars {...props.notifications} setClose={setClose} />
      <Header
        user={user}
        isAvailable={isAvailable}
        setIsDialogOpen={setIsDialogOpen}
      />
      <DialogBox
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        connectMetamask={connectMetamask}
        user={user}
      />
      {routes}
    </React.Fragment>
  )
};

const matchDispatchToProps = {
  setClose,
  connectMetamask
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
