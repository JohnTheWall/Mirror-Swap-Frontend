import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import FillTransaction from '../../components/FillTransaction';


const useStyles = makeStyles(theme => ({
  swapButtonContainer: {
    padding: theme.spacing(1),
    display: 'block',
    margin: 'auto',
    background: "#eee",
    width: "91%",
    textAlign: 'center'
  },
  swapButton: {
    background: '#eee',
    color: '#000 !important',
  },
  customPaper: {
    padding: theme.spacing(2),
  },
  customeGrid: {
    paddingTop: theme.spacing(2),
    margin: 'auto',
    width: 'auto'
  }
}));


const Fill = (props) => {
  const classes = useStyles()
  return (
    <Grid className={classes.customeGrid} container spacing={2}>
      <FillTransaction approveSwap />
      <FillTransaction />
    </Grid>
  )
}

export default Fill;
