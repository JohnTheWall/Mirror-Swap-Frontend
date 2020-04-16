import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    background: '#eee',
    borderRadius: '2.5rem',
    height: 'fit-content',
    "&:hover, &:focus": {
      background: '#0000FF',
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

const Header = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.grid} xs={12}>
      <Typography variant="h6">Mirror Swap</Typography>
      <Button className={classes.button}>Connect Account</Button>
    </Grid>
  )
}

export default Header;
