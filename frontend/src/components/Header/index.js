import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { connectMetamask } from '../../containers/Metamask/reducer';

const useStyles = makeStyles(theme => ({
  button: {
    background: '#eee',
    borderRadius: '2.5rem',
    height: 'fit-content',
    "&:hover, &:focus": {
      background: theme.palette.primary.main,
      color: '#FFFFFF'
    },
    alignContent: 'flex-end',
    marginInlineStart: 'auto'
  },
  grid: {
    padding: theme.spacing(3),
    display: 'flex',
  },
}));

const Header = (props) => {
  const classes = useStyles()
  return (
    <Grid item className={classes.grid} xs={12}>
      <Typography variant="h6">Mirror Swap</Typography>
      <Button
        className={classes.button}
        onClick={() => props.connectMetamask()}>
        {props.userAddress ? props.userAddress : 'Connect Account'}
      </Button>
    </Grid>
  )
}

const mapDispatchToProps = {
  connectMetamask
}

const mapStateToProps = (state) => ({
  userAddress: state.user.address
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
