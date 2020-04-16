import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TokenLogo from '../TokenLogo'
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '1rem',
    padding: theme.spacing(1.5)
  },
  customeGrid: {
    display: 'flex',
  },
  balance: {
    marginInlineStart: 'auto',
    fontSize: 11,
  },
  heading: {
    fontSize: 11
  },
  customeInput: {
    paddingTop: theme.spacing(1),
    width: '75%',
    fontSize: 30
  },
  customeButton: {
    borderRadius: '2.5rem',
    marginInlineStart: 'auto',
    margin: 'auto',
    marginRight: 'inherit',
  }
}));

const CurrencyInputPanel = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="outlined" square>
      <Grid className={classes.customeGrid}>
        <Typography className={classes.heading}>
          {props.title}
        </Typography>
        {props.showBalance && <Typography className={classes.balance}>Balance: 0</Typography>}
      </Grid>
      <Grid className={classes.customeGrid}>
        <InputBase
          className={classes.customeInput}
          placeholder='0.0'
          type='tel'
        />
        <Button className={classes.customeButton} variant="contained">
          <TokenLogo address='ETH' />
          ETH
          <ExpandMoreIcon />
        </Button>
      </Grid>
    </Paper>
  )
}

export default CurrencyInputPanel;
