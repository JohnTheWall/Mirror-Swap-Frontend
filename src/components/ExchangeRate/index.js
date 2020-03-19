import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    float: 'right',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '89%',
    }
  }
}));

const ExchangeRates = ({
  inputCurrency,
  outputCurrency,
  exchangeRate
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Typography variant='subtitle1'>
        Exchange Rate:
    </Typography>

      <Typography variant='subtitle1'>
        {`${1} ${inputCurrency.symbol} = ${exchangeRate} ${outputCurrency.symbol}`}
      </Typography>
    </div>
  );
};

ExchangeRates.propTypes = {
  exchangeRate: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  inputCurrency: PropTypes.object,
  outputCurrency: PropTypes.object,
};

export default ExchangeRates;
