import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  }
}));

const SwapHeader = ({ title }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" align='center' className={classes.title}>
        {title}
      </Typography>
    </Box>
  );
}

SwapHeader.propTypes = {
  title: PropTypes.string
};

export default SwapHeader;
