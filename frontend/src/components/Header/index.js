import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  address: {
    border: ' 1px solid #fff',
    borderRadius: '47px'
  }
}));

const Header = ({ user, isAvailable, setIsDialogOpen }) => {
  const classes = useStyles();

  const { address } = user
  const addressLength = address.length
  const shortAddressString = address.substr(0, 6) + '...' + address.substr(addressLength - 4, addressLength)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="button" className={classes.title}>
          Fabrx
        </Typography>
        {!!user.address
          ? <Button
            color="inherit"
            className={classes.address}
            onClick={() => setIsDialogOpen(true)}
          >
            {`Account: ${shortAddressString}`}
          </Button>
          : (isAvailable
            &&
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsDialogOpen(true)}
            >
              Connect Account
            </Button>)
        }
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired
};

export default Header;
