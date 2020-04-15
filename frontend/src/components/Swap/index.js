import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ExchangeRate from '../ExchangeRate'
import { reducer, initialArg } from './reducer';
import { isEmptyObject } from '../../utils';
import CustomButton from '../CustomButton';
import { Typography } from '@material-ui/core';
import CurrencyInputPanel from '../CurrencyInputPanel';
import OversizedPanel from '../OversizedPanel'
import styled from 'styled-components'
import ArrowDown from '../../assets/svg/SVGArrowDown'

const useStyles = makeStyles(theme => ({
  swapButtonContainer: {
    padding: '10px',
    display: 'block',
    margin: 'auto',
    background: "#eee",
    width: "518px",
    textAlign: 'center'
  },
  swapButton: {
    background: '#eee',
    color: '#000 !important',
  },
  customPaper: {
    padding: theme.spacing(2),
  },
}));

const DownArrowBackground = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;
`
const WrappedArrowDown = ({ clickable, active, ...rest }) => <ArrowDown {...rest} />
const DownArrow = styled(WrappedArrowDown)`
  color: ${({ theme, active }) => (active ? theme.royalBlue : theme.chaliceGray)};
  width: 0.625rem;
  height: 0.625rem;
  position: relative;
  padding: 0.875rem;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CurrencyInputPanel
          title='Input'
          showBalance />

        <div className={classes.swapButtonContainer}>
        <OversizedPanel>
        <DownArrowBackground>
          <DownArrow
            clickable
            alt="swap"
            active="true"
          />
        </DownArrowBackground>
      </OversizedPanel>
        </div>
        <CurrencyInputPanel title='Output' />
        <ExchangeRate
          inputCurrency={state.inputCurrency}
          outputCurrency={state.outputCurrency}
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
