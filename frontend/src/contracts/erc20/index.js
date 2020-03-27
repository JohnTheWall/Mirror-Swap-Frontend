import abi from './abi';
import { getAccounts } from '../../utils/metamask'

class ERC20 {
  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.contract = new window.web3.eth.Contract(abi, this.contractAddress);
  }

  async getDecimals() {
    const decimalValue = await this.contract.methods.decimals().call();
    return decimalValue;
  }

  async getBalance(walletAddress) {
    const balance = await this.contract.methods.balanceOf(walletAddress).call();
    return balance;
  }

  async getAllowance(owner, spender) {
    const balance = await this.contract.methods.allowance(owner, spender).call();
    return balance;
  }

  async approve(spender, tokenAmount) {
    const fromAccounts = await getAccounts();
    const from = fromAccounts[0];
    const txHash = await this.contract.methods.approve(spender, tokenAmount).send({ from });

    return txHash;
  }
}

export default ERC20;
