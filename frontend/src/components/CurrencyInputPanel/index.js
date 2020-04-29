import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, Button, Modal } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import etherLogo from '../../assets/images/ethereum-logo.svg'

const useStyles = makeStyles(theme => ({
  modalList: {
    width: '99%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    margin: 'auto',
    marginBottom: '10px',
  },
  paper: {
    borderRadius: '1rem',
    padding: theme.spacing(1.5)
  },
  customeGrid: {
    display: 'flex',
  },
  balance: {
    marginInlineStart: 'auto',
    fontSize: 11,
  },
  heading: {
    fontSize: 11
  },
  customeInput: {
    paddingTop: theme.spacing(1),
    width: '75%',
    fontSize: 30
  },
  customeButton: {
    borderRadius: '2.5rem',
    marginInlineStart: 'auto',
    margin: 'auto',
    marginRight: 'inherit',
    width: '15%',
  },
  modalPaper: {
    width: '40%',
    height: '60%',
    margin: 'auto',
    marginTop: '8%',
    borderRadius: '1rem',
    outline: 'none',
    marginBottom: '8%',
    display: 'flex',
    flexDirection: 'column',
  },
  modalGrid: {
    display: 'flex',
  },
  clearIcon: {
    marginInlineStart: 'auto',
    padding: theme.spacing(2),
    "&:hover, &:focus": {
      color: '#FF0000'
    },
  },
  modalTypography: {
    padding: theme.spacing(2)
  },
  modalInput: {
    width: '90%',
    fontSize: 18
  },
  searchIcon: {
    padding: theme.spacing(1),
  },
  priceGrid: {
    marginInlineStart: 'auto'
  },
  selectTypography: {
    color: '#a29e9e',
    fontSize: 15,
  },
  selectLogo: {
    width: '27%',
    paddingRight: '7%',
  },
  modalLogo: {
    height: '90%',
    width: '5%',
    paddingRight: '3%',
  },
  listItem: {
    padding: theme.spacing(2),
    "&:hover, &:focus": {
      background: '#eee'
    },
  }

}));

const CurrencyInputPanel = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState({symbol: 'ETH'})
  
  const handleModalOpen = (value) => {
    setIsOpen(value)
  }

  const handleCurrenctSelected = (currency) => {
    setIsOpen(false)
    props.handleCurrencyChange(currency)
    setSelectedCurrency(currency)
  }

  const body = (
    <>
      <Grid className={classes.modalGrid}>
        <Typography className={classes.modalTypography}>Select Token</Typography>
        <ClearIcon className={classes.clearIcon} onClick={() => handleModalOpen(false)} />
      </Grid>
      <Grid className={classes.modalGrid}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase
          className={classes.modalInput}
          placeholder='Search Token Name, Symbol, or Address'
          type='text'
        />
      </Grid>
      <List className={classes.modalList}>
      {props.currencies && props.currencies.map(option => (
          <ListItem onClick={(e) => handleCurrenctSelected(option)} className={classes.listItem} key={`item-${option.id}`}>
            <img src={etherLogo} className={classes.modalLogo} />
            <Grid >
              <Typography>{option.symbol}</Typography>
              <Typography className={classes.selectTypography}>{option.name}</Typography>
            </Grid>
            <Grid className={classes.priceGrid}>
      <Typography>{option.exchangeRate.toFixed(4)}</Typography>
              <Typography className={classes.selectTypography}>$1.3</Typography>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <Paper className={classes.paper} variant="outlined" square>
      <Grid className={classes.customeGrid}>
        <Typography className={classes.heading}>
          {props.title}
        </Typography>
        {props.showBalance && <Typography className={classes.balance}>Balance: 0</Typography>}
      </Grid>
      <Grid className={classes.customeGrid}>
        <InputBase
          className={classes.customeInput}
          placeholder='0.0'
          type='tel'
          onChange={props.handleInputChange}
          value={props.value ? props.value : ''}
        />
        <Button className={classes.customeButton} onClick={() => handleModalOpen(true)} variant="contained">
          <img src={etherLogo} className={classes.selectLogo} />
         {selectedCurrency.symbol}
          <ExpandMoreIcon />
        </Button>
      </Grid>
      <Modal
        open={isOpen}
        onClose={() => handleModalOpen(false)}
        disableAutoFocus={true}
        className={classes.modal}
      >
        <Paper className={classes.modalPaper} square>
          {body}
        </Paper>
      </Modal>
    </Paper>
  )
}

export default CurrencyInputPanel;
