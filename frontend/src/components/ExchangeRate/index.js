import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const ExchangeRates = ({
  inputCurrency,
  outputCurrency,
  exchangeRate
}) => {
  return (
    <Grid container justify="space-between">
      <Typography variant='subtitle1'>
        Exchange Rate:
      </Typography>

      <Typography variant='subtitle1'>
        {`${1} ${inputCurrency.symbol} = ${exchangeRate} ${outputCurrency.symbol}`}
      </Typography>
    </Grid>
  );
};

ExchangeRates.propTypes = {
  exchangeRate: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  inputCurrency: PropTypes.object,
  outputCurrency: PropTypes.object,
};

export default ExchangeRates;
