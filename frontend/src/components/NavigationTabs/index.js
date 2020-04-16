import React from 'react';
import { withRouter } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';

const useStyles = makeStyles(theme => ({
  tab: {
    borderRadius: '2.5rem',
    background: '#eee',
    "&:hover, &:focus": {
      background: '#0000FF',
      color: '#FFFFFF'
    },
  },
  tabs: {
    borderRadius: '2.5rem',
    background: '#eee',
  }
}));

function NavigationTabs(props) {
  const classes = useStyles()
  const handelClick = (path) => {
    console.log(path)
    push(path)
  }
  return (
    <Tabs
      className={classes.tabs}
      variant="fullWidth"
    >
      {
        props.tabs.map(
          ({ label, path }) => <Tab value={label}
            label={label}
            className={classes.tab}
            onClick={() => handelClick(path)} />
        )
      }
    </Tabs>
  )
}

export default withRouter(NavigationTabs)
