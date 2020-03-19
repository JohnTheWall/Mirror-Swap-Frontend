import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import metaMaskImg from "../../images/metamaskimg.svg";
import zoomIcon from "../../images/zoomicon.svg";
import { METAMASK_CHROME_EXTENSION, CHROME_INSTALLATION } from '../../constants';

const useStyles = makeStyles(theme => ({
  providerBg: {
    backgroundRepeat: 'no-repeat',
    height: '714px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundSize: '100% 100%',
    flexDirection: 'column'
  },
  providerHeading: {
    color: '#5C5D66',
    fontSize: '30px',
    fontWeight: 'bold',
    padding: '15px 0',
  },
  providerPara: {
    width: '31%',
    textAlign: 'center',
  }
}));

const MetaMaskNotDetected = (props) => {
  const classes = useStyles();

  if(props.metamask.isAvailable) {
    props.history.push('/');
  }

  return (
    <div className={classes.providerBg}>
      <img src={zoomIcon} alt="" />
      <h2 className={classes.providerHeading}>No providers detected</h2>
      <div className={classes.providerPara}>
        <p>To be able to use our services please use the <a href={CHROME_INSTALLATION}>Chrome browser</a> and
          installed the <a target="_blank" rel="noopener noreferrer" href={METAMASK_CHROME_EXTENSION}>METAMASK</a> extension.</p>
        <p>After installation, please create an ethereum account and
            connect this to metamask.</p>
      </div>
      <a href={METAMASK_CHROME_EXTENSION}>
        <img src={metaMaskImg} alt="" />
      </a>
    </div>
  )
}

MetaMaskNotDetected.propTypes = {
  metamask: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  metamask: state.metamask,
});

export default connect(
  mapStateToProps,
  null,
)(MetaMaskNotDetected);
