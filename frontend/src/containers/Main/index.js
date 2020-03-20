import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../Currency/reducer';
import { startContractDeployment } from './reducer';
import Swap from '../../components/Swap';
import { NETWORK_CHAIN_ID } from '../../constants';

const Main = (props) => {
  const { getCurrencies, ...otherProps } = props

  useEffect(() => {
    getCurrencies();
  }, [ getCurrencies ]);
  
  return (<Swap {...otherProps}/>);
}

Main.propTypes = {
  user: PropTypes.object.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  startContractDeployment: PropTypes.func.isRequired,
  isMainnet: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  getCurrencies,
  startContractDeployment,
};

const mapStateToProps = (state) => ({
  user: state.user,
  currencies: state.currency.currencies,
  loading: state.currency.loading || state.contract.loading,
  isMainnet: state.metamask.networkId === NETWORK_CHAIN_ID.Mainnet
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
