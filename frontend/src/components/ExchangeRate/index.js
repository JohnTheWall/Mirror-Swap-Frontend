import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  customGrid: {
    display: 'flex',
    width: '95%',
    margin: 'auto',
    background: '#eee',
    borderRadius: '0px 0px 15px 15px'
  },
  customeTypography: {
    marginInlineStart: 'auto',
    paddingRight: theme.spacing(1)
  },
  exchangeRate: {
    fontSize: 13,
    paddingLeft: theme.spacing(1)
  }
}));

const ExchangeRates = () => {

  const classes = useStyles()
  return (
    <Grid className={classes.customGrid}>
      <Typography className={classes.exchangeRate}>Exchange Rate:</Typography>
      <Typography className={classes.customeTypography}>-</Typography>
    </Grid>
  );  
};

ExchangeRates.propTypes = {
  inputCurrency: PropTypes.object,
  outputCurrency: PropTypes.object,
};

export default ExchangeRates;
