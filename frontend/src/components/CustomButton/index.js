import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const CustomButton = ({ disabled, onClick, title, loading }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Button 
        variant="contained" 
        color="primary" 
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </Button>
    </React.Fragment>
  )
}

CustomButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

export default CustomButton



