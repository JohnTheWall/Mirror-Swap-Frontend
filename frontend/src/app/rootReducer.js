import { combineReducers } from 'redux';
import metamask from '../containers/Metamask/reducer';
import user from '../containers/User/reducer';
import notifications from '../containers/Notifications/reducer';
import { connectRouter } from 'connected-react-router';
import currency from '../containers/Currency/reducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  metamask,
  user,
  notifications,
  currency
});

export default createRootReducer;
