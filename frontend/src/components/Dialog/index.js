import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import metamaskLogo from "../../images/metamaskLogo.svg";
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  dialogContent: {
    padding: '60px'
  },
  walletButton: {
    display: 'block',
    padding: '10px',
    borderRadius: '22px',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '100%',
    border: '2px solid #dfdfdf'
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  address: {
    fontSize:'13px',
    fontWeight:'400',
    textAlign:'left'
  },
  title: {
    background: '#3f51b5',
    color: '#fff'
  },
  logoText: {
    fontSize:'13px',
    textTransform:'capitalize',
    marginLeft:'5px',
  }
}))

const DialogBox = ({
  isDialogOpen,
  setIsDialogOpen,
  connectMetamask,
  user
}) => {
  const classes = useStyles()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
      >
        <DialogTitle className={classes.title} id="responsive-dialog-title">Connect To A Wallet</DialogTitle>
        <DialogContent>
          <Button onClick={() => connectMetamask()} className={classes.walletButton}>
            <div className={classes.logo}>
              <img width="30" height="30" src={metamaskLogo} alt="logo" />
              <span className={classes.logoText}> MetaMask </span>
            </div>
            <div className={classes.address}>
              {user.address}
            </div>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setIsDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogBox.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  connectMetamask: PropTypes.func.isRequired
}

export default DialogBox
