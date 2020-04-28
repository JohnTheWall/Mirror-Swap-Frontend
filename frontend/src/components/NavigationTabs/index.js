import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core';

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
    props.push(path)
  }
  return (
    <Tabs
      className={classes.tabs}
      variant="fullWidth"
    >
      {
        props.tabs.map(
          ({ label, path }, index) => <Tab value={label}
            key={index}
            label={label}
            className={classes.tab}
            onClick={() => handelClick(path)} />
        )
      }
    </Tabs>
  )
}

export default NavigationTabs
