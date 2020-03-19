import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../Currency/reducer';
import Swap from '../../components/Swap'

const Main = (props) => {
  return (<Swap {...props}/>);
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
