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
  button: {
    textTransform: 'none',
    borderRadius: '2.5rem',
    width: '107%',
    background: theme.palette.primary.main,
    color: '#FFF',
    "&:hover, &:focus": {
      background: theme.palette.primary.main,
      color: '#FFF'
    },
  }
}));

const CustomButton = ({ disabled, onClick, title, loading }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Button
        className={classes.button}
        variant="contained"
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
