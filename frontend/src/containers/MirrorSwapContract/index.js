import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TakerView from '../../components/TakerView';
import MakerView from '../../components/MakerView';
import { 
  getContractState,
  depositMakerAsset,
  swapTakerAsset,
  cancelSwap,
  approveToken,
} from './reducer';
import Loader from '../../components/Loader';

const MirrorSwapContract = ({ getContractState, swapContractAddress, loadingContractState, isMaker, ...props }) => {
  useEffect(() => {
    getContractState(swapContractAddress)
  }, [getContractState, swapContractAddress])

  if (loadingContractState) {
    return <Loader />;
  }

  const makerApproveToken = () => {
    props.approveToken({
      tokenContractAddress: props.contractData.makerAssetAddress,
      spenderAddress: swapContractAddress, 
      tokenAmount: props.contractData.makerAssetAmount,
    })
  }

  const takerApproveToken = () => {
    props.approveToken({
      tokenContractAddress: props.contractData.takerAssetAddress,
      spenderAddress: swapContractAddress, 
      tokenAmount: props.contractData.takerAssetAmount,
    })
  }

  return isMaker ? 
    <MakerView 
      contractData={props.contractData}
      depositMakerAsset={() => props.depositMakerAsset(swapContractAddress)}
      cancelSwap={() => props.cancelSwap(swapContractAddress)}
      loading={props.loadingAction}
      approveToken={makerApproveToken}
    /> : 
    <TakerView 
      contractData={props.contractData}
      loading={props.loadingAction}
      swapTakerAsset={() => props.swapTakerAsset(swapContractAddress)}
      approveToken={takerApproveToken}
    />;
}

MirrorSwapContract.propTypes = {
  contractData: PropTypes.object.isRequired,
  swapContractAddress: PropTypes.string.isRequired,
  loadingContractState: PropTypes.bool.isRequired,
  loadingAction: PropTypes.bool.isRequired,
  isMaker: PropTypes.bool.isRequired,
  getContractState: PropTypes.func.isRequired,
  depositMakerAsset: PropTypes.func.isRequired,
  swapTakerAsset: PropTypes.func.isRequired,
  cancelSwap: PropTypes.func.isRequired,
  approveToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getContractState,
  depositMakerAsset,
  swapTakerAsset,
  cancelSwap,
  approveToken,
};

const mapStateToProps = (state, ownProps) => ({
  contractData: state.mirrorSwapContract.contractData,
  swapContractAddress: ownProps.match.params.contractAddress,
  loadingContractState: state.mirrorSwapContract.loadingContractState,
  loadingAction: state.mirrorSwapContract.loadingAction,
  isMaker: state.mirrorSwapContract.contractData.makerWalletAdress === state.user.address,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MirrorSwapContract);
