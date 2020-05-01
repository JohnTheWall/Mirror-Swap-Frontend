import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ExchangeRate from '../ExchangeRate'
import { reducer, initialArg } from './reducer';
import { isEmptyObject } from '../../utils';
import CustomButton from '../CustomButton';
import { Typography } from '@material-ui/core';
import CurrencyInputPanel from '../CurrencyInputPanel';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
  swapButtonContainer: {
    padding: theme.spacing(1),
    display: 'block',
    margin: 'auto',
    background: "#eee",
    width: "91%",
    textAlign: 'center'
  },
  swapButton: {
    background: '#eee',
    color: '#000 !important',
  },
  customPaper: {
    padding: theme.spacing(2),
  },
  customeGrid: {
    paddingTop: theme.spacing(2)
  }
}));

const Swap = ({ currencies, startContractDeployment, loading, user, isMainnet }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialArg);
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    setExchangeRate(state.inputCurrency.exchangeRate / state.outputCurrency.exchangeRate)
  }, [state.inputCurrency, state.outputCurrency])

  const handleSwapButtonClick = () => {
    startContractDeployment(state);
  }
  const disableButton = isEmptyObject(state.inputCurrency) ||
    isEmptyObject(state.outputCurrency) ||
    state.inputValue <= 0 ||
    state.outputValue <= 0 ||
    loading ||
    !isMainnet ||
    !user.address;

  const handleInputOutputSwap = () => {
    dispatch({ type: 'inputValue', payload: state.outputValue })
    dispatch({ type: 'inputCurrency', payload: state.outputCurrency })
    dispatch({ type: 'outputCurrency', payload: state.inputCurrency })
    dispatch({ type: 'outputValue', payload: state.inputValue })
  }

  return (
    <Grid className={classes.customeGrid} container spacing={2}>
      <Grid item xs={12}>
        <CurrencyInputPanel
          title='Input'
          showBalance
          handleInputChange={(e) => dispatch({ type: 'inputValue', payload: e.target.value })}
          handleCurrencyChange={(currency) => dispatch({ type: 'inputCurrency', payload: currency })}
          currencies={currencies}
          value={state.inputValue}
          selectedCurrency={state.inputCurrency}
        />
        <Grid className={classes.swapButtonContainer}>
          <ArrowDownwardIcon onClick={handleInputOutputSwap} fontSize="small" />
        </Grid>
        <CurrencyInputPanel
          title='Output'
          handleCurrencyChange={(currency) => dispatch({ type: 'outputCurrency', payload: currency })}
          handleInputChange={(e) => dispatch({ type: 'outputValue', payload: e.target.value })}
          currencies={currencies}
          value={state.outputValue}
          selectedCurrency={state.outputCurrency}
        />
        <ExchangeRate
          inputCurrency={state.inputCurrency}
          outputCurrency={state.outputCurrency}
          rate={exchangeRate}
        />
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={4}>
          <CustomButton
            title="Deploy Swap"
            disabled={disableButton}
            onClick={handleSwapButtonClick}
            loading={loading}
          />
        </Grid>
        {
          !isMainnet && (
            <Typography variant='subtitle1'>
              We are only supporting Mainnet!
            </Typography>
          )
        }
      </Grid>
    </Grid>
  );
};

Swap.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  startContractDeployment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isMainnet: PropTypes.bool.isRequired,
};

export default Swap;
