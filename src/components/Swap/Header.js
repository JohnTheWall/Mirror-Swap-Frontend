import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    // flexGrow: 1
  }
}));

const SwapHeader = ({ title, user }) => {
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
