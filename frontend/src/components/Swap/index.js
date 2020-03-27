import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Box, Paper } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ExchangeRate from '../ExchangeRate'
import SwapInput from '../SwapInput';
import SwapHeader from './SwapHeader';
import { reducer, initialArg } from './reducer';
import { isEmptyObject } from '../../utils';
import CustomButton from '../CustomButton';
import { Typography } from '@material-ui/core';

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

const Swap = ({ currencies, startContractDeployment, loading, user, isMainnet }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialArg);

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

  return (
    <Box m={4}>
      <Grid container justify="center">
        <Grid item xs={10} sm={7}>
          <Paper variant="outlined" className={classes.customPaper}>
            <SwapHeader title="Swap"/>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <SwapInput
                      inputValue={state.inputValue.toString()}
                      handleInputChange={(e) => dispatch({ type: 'inputValue', payload: e.target.value })}
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
                      inputValue={state.outputValue.toString()}
                      handleInputChange={(e) => dispatch({ type: 'outputValue', payload: e.target.value })}
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
                  <Grid container direction="column" alignItems="center">
                    <Grid item xs={4}>
                      <CustomButton 
                        title="Swap"
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
            </Paper>
        </Grid>
      </Grid>
    </Box>
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
