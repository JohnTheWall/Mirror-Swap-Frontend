import abi from './abi';

class ERC20 {
  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.contract = new window.web3.eth.Contract(abi, this.contractAddress);
  }

  async getDecimals() {
    const decimalValue = await this.contract.methods.decimals().call();
    return decimalValue;
  }
}

export default ERC20;
