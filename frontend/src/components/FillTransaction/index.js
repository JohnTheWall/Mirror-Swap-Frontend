import React from 'react';
import { Paper, makeStyles, Grid, Typography, Button } from '@material-ui/core';
import chainLinkLogo from '../../assets/images/chainlink-link-logo.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '1rem',
    padding: theme.spacing(1),
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  logo: {
    width: '4%',
  },
  customGrid: {
    display: 'flex',
    padding: theme.spacing(0.5),
  },
  symbolTyography: {
    color: '#585858',
    fontSize: 25,
    paddingLeft: theme.spacing(1)
  },
  currencyTypography: {
    fontSize: 18,
    marginTop: '1%',
    color: '#797878',
    paddingLeft: theme.spacing(1)
  },
  rateTypography: {
    fontSize: 25,
    marginInlineStart: 'auto',
    color: '#585858',
  },
  priceTypography: {
    paddingLeft: theme.spacing(3.8),
    color: '#a2a2a2',
    fontSize: 15,
    marginTop: theme.spacing(0.2),
    marginRight: theme.spacing(0.5)
  },
  secoundryPrice: {
    marginInlineStart: 'auto',
    color: '#797878',
  },
  secPriceTypography: {
    paddingLeft: theme.spacing(0.5),
    color: '#a2a2a2'
  },
  button: {
    textTransform: 'none',
    width: '95%',
    // background: '#eee',
    borderRadius: '2.5rem',
    fontSize: 18
  },
  buttonGrid: {
    justifyContent: 'center',
    display: 'flex',
    padding: theme.spacing(1)
  },
  secTypography: {
    color: '#797878',
  }
}));



const FillTransaction = (props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper} variant="outlined" square>
      <Grid className={classes.customGrid}>
        <img src={chainLinkLogo} className={classes.logo} />
        <Typography className={classes.symbolTyography}>LINK</Typography>
        <Typography className={classes.currencyTypography}> /USDC</Typography>
        <Typography className={classes.rateTypography}>50</Typography>
        <Typography className={classes.currencyTypography}>LINK</Typography>
      </Grid>
      <Grid className={classes.customGrid}>
        <Typography className={classes.priceTypography}>Price</Typography>
        <Typography className={classes.secTypography}>2.59 USDC</Typography>
        <Typography className={classes.secoundryPrice}>129.50 USDC</Typography>
        <Typography className={classes.secPriceTypography}>($130.07)</Typography>
      </Grid>
      <Grid className={classes.buttonGrid}>
      <Button variant="outlined" className={classes.button}>{props.approveSwap ? 'Approve Swap' : 'Fill Swap'}</Button>
      </Grid>
    </Paper>
  )
}

export default FillTransaction;
