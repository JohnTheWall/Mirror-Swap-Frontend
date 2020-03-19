import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../Currency/reducer';
import Swap from '../../components/Swap'

const Main = (props) => {
  const { getCurrencies, ...otherProps } = props

  useEffect(() => {
    getCurrencies();
  }, [getCurrencies]);
  return (<Swap {...otherProps}/>);
}

Main.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = {
  getCurrencies,
};

const mapStateToProps = (state) => ({
  currencies: state.currency.currencies,
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
