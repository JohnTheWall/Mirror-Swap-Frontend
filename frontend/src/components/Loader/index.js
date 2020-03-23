import React from 'react';
import { Grid, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return (
    <Box m={10}>
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    </Box>
  );
}

export default Loader;
