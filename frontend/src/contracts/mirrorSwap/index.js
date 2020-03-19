import { getAccounts } from '../../utils/metamask'
import abi from './abi';
import { byteCode } from './byteCode';

class MirrorSwap {
  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.contract = new window.web3.eth.Contract(abi, this.contractAddress);
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
}

export default MirrorSwap;
