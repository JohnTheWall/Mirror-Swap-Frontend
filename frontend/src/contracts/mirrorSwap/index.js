import { getAccounts } from '../../utils/metamask'
import abi from './abi';
import { byteCode } from './byteCode';

class MirrorSwap {
  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.contract = new window.web3.eth.Contract(abi, this.contractAddress);
  }

  async getState() {
    const makerAssetAddress = await this.contract.methods.MakerAsset().call();
    const takerAssetAddress = await this.contract.methods.TakerAsset().call();

    const takerAssetAmount = await this.contract.methods.TakerAssetAmount().call();
    const makerAssetAmount = await this.contract.methods.MakerAssetAmount().call();

    const makerWalletAdress = await this.contract.methods.MakerWalletAddress().call();
    const takerWalletAddress = await this.contract.methods.TakerWalletAddress().call();
    
    const RevertTimestamp = await this.contract.methods.RevertTimestamp().call();
    const swapComplete = await this.contract.methods.swapComplete().call();

    return { 
      makerAssetAddress,
      takerAssetAddress,
      makerAssetAmount,
      takerAssetAmount,
      makerWalletAdress,
      takerWalletAddress,
      RevertTimestamp,
      swapComplete,
    }
  }

  async deployContract(makerAsset, takerAsset, makerAssetAmount, takerAssetAmount) {
    const fromAccounts = await getAccounts();
    const from = fromAccounts[0];

    const response = await this.contract
      .deploy({
        data: byteCode,
        arguments: [makerAsset, takerAsset, makerAssetAmount, takerAssetAmount, 86400],
      })
      .send({
        from,
      });

    return response;
  }

  async depositMakerAsset(value = '0') {
    const fromAccounts = await getAccounts();
    const from = fromAccounts[0];

    const txHash = await this.contract.methods.depositMakerAsset().send({ from, value });
    return txHash;
  }

  async swapTakerAsset(value = '0') {
    const fromAccounts = await getAccounts();
    const from = fromAccounts[0];

    const txHash = await this.contract.methods.swapTakerAsset().send({ from, value });
    return txHash;
  }

  async cancelSwap() {
    const fromAccounts = await getAccounts();
    const from = fromAccounts[0];

    const txHash = await this.contract.methods.cancelSwap().send({ from });
    return txHash;
  }
}

export default MirrorSwap;
