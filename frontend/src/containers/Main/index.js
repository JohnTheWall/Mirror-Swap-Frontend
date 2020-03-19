import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../Currency/reducer';
import { startContractDeployment } from './reducer';
import Swap from '../../components/Swap'

const Main = (props) => {
  const { getCurrencies, ...otherProps } = props

  useEffect(() => {
    getCurrencies();
  }, [ getCurrencies ]);
  
  return (<Swap {...otherProps}/>);
}

Main.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  startContractDeployment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getCurrencies,
  startContractDeployment,
};

const mapStateToProps = (state) => ({
  currencies: state.currency.currencies,
  loading: state.currency.loading || state.contract.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
