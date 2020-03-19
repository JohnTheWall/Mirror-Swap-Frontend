import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { isEmptyObject } from '../../utils';

const ExchangeRates = ({
  inputCurrency,
  outputCurrency,
}) => {
  return (
    <Grid container justify="space-between">
      <Typography variant='subtitle1'>
        Exchange Rate:
      </Typography>

      {
        !isEmptyObject(inputCurrency) && !isEmptyObject(outputCurrency) && (
          <Typography variant='subtitle1'>
            {
              `${1} ${inputCurrency.symbol} = ${inputCurrency.exchangeRate/outputCurrency.exchangeRate} ${outputCurrency.symbol}`
            }
          </Typography>
        )
      }
    </Grid>
  );
};

ExchangeRates.propTypes = {
  inputCurrency: PropTypes.object,
  outputCurrency: PropTypes.object,
};

export default ExchangeRates;
