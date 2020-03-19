import React from 'react'
import InputField from '../InputField';
import { makeStyles, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  item: {
    margin: theme.spacing(1),
  },
  select: {
    width: '100%',
  },
  inputCountrol: {
    width: '100%',
    marginRight: '30px',
  },
}));


const SwapInput = ({
  inputValue,
  handleInputChange,
  currency,
  handleCurrencyChange,
  currencies,
  inputLabel,
  selectLabel
}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6} className={classes.item}>
        <InputField
          className={classes.inputCountrol}
          required
          label={inputLabel}
          autoFocus
          name="Input"
          type="number"
          value={inputValue || ''}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} className={classes.item}>
        <InputField
          className={classes.select}
          select
          label={selectLabel}
          name="Input_currency"
          variant="outlined"
          value={(currency && currency.symbol) || ''}
          onChange={handleCurrencyChange}
        >
          {currencies && currencies.map(option => (
            <MenuItem currency={option} key={option.id} value={option.symbol}>
              {option.symbol}
            </MenuItem>
          ))}
        </InputField>
      </Grid>
    </Grid>
  )
}

SwapInput.propTypes = {
  inputValue: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  currency: PropTypes.object,
  handleCurrencyChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object),
  inputLabel: PropTypes.string,
  selectLabel: PropTypes.string
}

export default SwapInput
