import { getAccounts } from '../../utils/metamask'
import abi from './abi';
import { byteCode } from './byteCode';

class MirrorSwap {

  static async deploy() {
    const fromAccounts = await getAccounts();
    const from = fromAccounts[0];

    const myContract = await new window.web3.eth.Contract(abi, { from, data: byteCode });
    return myContract;
  }

  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.contract = new window.web3.eth.Contract(abi, this.contractAddress);
  }
}

export default MirrorSwap;
