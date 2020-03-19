import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Box, Paper } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ExchangeRate from '../ExchangeRate'
import SwapInput from '../Fields';
import SwapHeader from './Header';
import { reducer, initialArg } from './reducer';

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
    padding: theme.spacing(2),
  }
}));

const Swap = ({ currencies, user }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialArg);

  return (
    <Box m={4}>
      <Grid container justify="center">
        <Grid item xs={10} sm={7}>
          <Paper variant="outlined" className={classes.customPaper}>
            <SwapHeader title="Swap" user={user} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <SwapInput
                      inputValue={state.inputValue}
                      handleInputChange={(e) => dispatch({ type: 'inputValue', payload: parseInt(e.target.value, 10) })}
                      currency={state.inputCurrency}
                      handleCurrencyChange={(e, { props }) => dispatch({ type: 'inputCurrency', payload: props.currency })}
                      currencies={currencies}
                      inputLabel="input"
                      selectLabel="currency"
                    />
                    <div className={classes.swapButtonContainer}>
                      <Button 
                        className={classes.swapButton} 
                        onClick={(e) => dispatch({ type: 'handleSwap' })} 
                        disabled={!(state.inputValue && state.outputValue)}
                      >
                        <SwapVertIcon color="primary" />
                      </Button>
                    </div>
                    <SwapInput
                      inputValue={state.outputValue}
                      handleInputChange={(e) => dispatch({ type: 'outputValue', payload: parseInt(e.target.value, 10) })}
                      currency={state.outputCurrency}
                      handleCurrencyChange={(e, { props }) => dispatch({ type: 'outputCurrency', payload: props.currency })}
                      currencies={currencies}
                      inputLabel="output"
                      selectLabel="currency"
                    />
                    <ExchangeRate
                      inputCurrency={state.inputCurrency}
                      outputCurrency={state.outputCurrency}
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
