import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  customGrid: {
    display: 'flex',
    width: '95%',
    margin: 'auto',
    background: '#eee',
    borderRadius: '0px 0px 15px 15px',
    height: '8%'
  },
  customeTypography: {
    marginInlineStart: 'auto',
    paddingRight: theme.spacing(1),
    fontSize: '12px',
  },
  exchangeRate: {
    fontSize: 13,
    paddingLeft: theme.spacing(1)
  }
}));

const ExchangeRates = (props) => {

  const classes = useStyles()
  return (
    <Grid className={classes.customGrid}>
      <Typography className={classes.exchangeRate}>Exchange Rate:</Typography>
      <Typography className={classes.customeTypography}>
        {props.rate ? `1 ${props.inputCurrency.symbol} = ${props.rate.toFixed(5)} ${props.outputCurrency.symbol}`: '-'}
      </Typography>
    </Grid>
  );
};

ExchangeRates.propTypes = {
  inputCurrency: PropTypes.object,
  outputCurrency: PropTypes.object,
};

export default ExchangeRates;
