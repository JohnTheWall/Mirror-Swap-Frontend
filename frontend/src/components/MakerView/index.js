import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Grid, Box, Paper } from '@material-ui/core';
import CustomButton from '../CustomButton';

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

const MakerView = ({ contractData, loading, depositMakerAsset, cancelSwap }) => {
  const classes = useStyles();
  return (
    <Box m={4}>
      <Grid container justify="center">
        <Grid item xs={12} sm={9}>
          <Paper variant="outlined" className={classes.customPaper}>
            <Typography variant="h4" align='center' className={classes.title}>
              Maker
            </Typography>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Maker Asset Address: 
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {contractData.makerAssetAddress}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Maker Wallet Address: 
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {contractData.makerWalletAdress}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Maker Amount To Deposit: 
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {contractData.makerAssetAmount}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <CustomButton 
                title="Deposit Asset"
                onClick={() => depositMakerAsset()}
                disabled={loading}
                loading={loading}
              />
              <CustomButton 
                title="Cancel Swap"
                onClick={() => cancelSwap()}
                disabled={loading}
                loading={loading}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

MakerView.propTypes = {
  contractData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  depositMakerAsset: PropTypes.func.isRequired,
  cancelSwap: PropTypes.func.isRequired,
};

export default MakerView;
