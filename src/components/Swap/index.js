import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Box, Card, Paper } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ExchangeRate from '../ExchangeRate'
import { calculateExchangeRate } from '../../utils/calculator'
import { useEffect } from 'react';
import SwapInput from '../Fields';
import SwapHeader from './Header';

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
    padding: theme.spacing(1),
  }
}));

const Swap = ({ currencies, user }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState()
  const [outputValue, setOutputValue] = useState()
  const [inputCurrency, setInputCurrency] = useState((currencies && currencies.length && currencies[0]) || null)
  const [outputCurrency, setOutputCurrency] = useState((currencies && (currencies.length > 1) && currencies[1]) || null)
  const [exchangeRate, setExchangeRate] = useState(null)

  const inputCurrencyPrice = inputCurrency && inputCurrency.quote.USD.price
  const outputCurrencyPrice = outputCurrency && outputCurrency.quote.USD.price

  const handleSwap = () => {
    const tempInput = inputValue
    const tempInputCurrency = inputCurrency

    setInputValue(outputValue)
    setInputCurrency(outputCurrency)

    setOutputValue(tempInput)
    setOutputCurrency(tempInputCurrency)
  }

  const handleInputChange = e => {
    const inVal = e.target.value
    setInputValue(inVal)

    inputCurrencyPrice &&
      outputCurrencyPrice &&
      (setOutputValue(inVal * calculateExchangeRate(inputCurrencyPrice, outputCurrencyPrice)))

  }

  const handleOutputChange = e => {
    const outVal = e.target.value
    setOutputValue(outVal)


    inputCurrencyPrice &&
      outputCurrencyPrice &&
      (setInputValue(outVal * calculateExchangeRate(outputCurrencyPrice, inputCurrencyPrice)))
  }

  useEffect(() => {
    inputCurrencyPrice &&
      outputCurrencyPrice &&
      setExchangeRate(calculateExchangeRate(inputCurrencyPrice, outputCurrencyPrice))
  }, [
    inputCurrencyPrice,
    outputCurrencyPrice
  ])

  useEffect(() => {
    inputCurrencyPrice &&
      outputCurrencyPrice &&
      (setOutputValue(inputValue * calculateExchangeRate(inputCurrencyPrice, outputCurrencyPrice)))
  }, [
    inputCurrencyPrice,
  ])

  useEffect(() => {
    inputCurrencyPrice &&
      outputCurrencyPrice &&
      (setOutputValue(inputValue * calculateExchangeRate(inputCurrencyPrice, outputCurrencyPrice)))
  }, [
    outputCurrencyPrice
  ])

  return (
    <Box m={4}>
      <Grid container justify="center">
        <Grid item xs={10} sm={6}>
          <Paper variant="outlined" className={classes.customPaper}>
            <SwapHeader title="Swap" user={user} />
                <Grid spacing={2}>
                  <Grid item xs={12}>
                    <SwapInput
                      inputValue={inputValue}
                      handleInputChange={handleInputChange}
                      currency={inputCurrency}
                      handleCurrencyChange={(e, { props }) => setInputCurrency(props.currency)}
                      currencies={currencies}
                      inputLabel="input"
                      selectLabel="currency"
                    />
                    <div className={classes.swapButtonContainer}>
                      <Button className={classes.swapButton} onClick={handleSwap} disabled={!(inputValue && outputValue)}>
                        <SwapVertIcon color="primary" />
                      </Button>
                    </div>
                    <SwapInput
                      inputValue={outputValue}
                      handleInputChange={handleOutputChange}
                      currency={outputCurrency}
                      handleCurrencyChange={(e, { props }) => setOutputCurrency(props.currency)}
                      currencies={currencies}
                      inputLabel="output"
                      selectLabel="currency"
                    />
                    <ExchangeRate
                      inputCurrency={inputCurrency}
                      outputCurrency={outputCurrency}
                      inputValue={inputValue}
                      outputValue={outputValue}
                      exchangeRate={exchangeRate}
                    />
                  </Grid>
                  <div className={classes.swapButtonContainer}>
                    <Button variant="contained" color="primary" disableElevation>
                      swap
                    </Button>
                  </div>
                </Grid>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};


Swap.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object
};

export default Swap;
