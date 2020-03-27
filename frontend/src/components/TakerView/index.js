import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Grid, Box, Paper } from '@material-ui/core';
import CustomButton from '../CustomButton';
import { EMPTY_ADDRESS } from '../../constants'

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

const TakerView = ({ contractData, loading, swapTakerAsset, approveToken }) => {
  const classes = useStyles();
  const { swapComplete, takerAssetAddress, takerAssetAmount, isTokensApprovedByTaker } = contractData;
  const showApproveButton = takerAssetAddress !== EMPTY_ADDRESS && !isTokensApprovedByTaker;

  return (
    <Box m={4}>
      <Grid container justify="center">
        <Grid item xs={12} sm={9}>
          <Paper variant="outlined" className={classes.customPaper}>
            <Typography variant="h4" align='center' className={classes.title}>
              Taker
            </Typography>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Taker Asset Address: 
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {takerAssetAddress}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Taker Amount To Deposit: 
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {takerAssetAmount}
                </Typography>
              </Grid>
            </Grid>
            {
              !swapComplete && (
                <Grid container justify="center">
                  {
                    showApproveButton ? 
                    (
                      <CustomButton 
                        title="Approve Swap"
                        onClick={() => approveToken()}
                        disabled={loading}
                        loading={loading}
                      />
                    ) : 
                    (
                      <CustomButton 
                        title="Initiate Swap"
                        onClick={() => swapTakerAsset()}
                        disabled={loading}
                        loading={loading}
                      />
                    )
                  }
                </Grid>
              )
            }
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

TakerView.propTypes = {
  contractData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  swapTakerAsset: PropTypes.func.isRequired,
  approveToken: PropTypes.func.isRequired,
};

export default TakerView;
