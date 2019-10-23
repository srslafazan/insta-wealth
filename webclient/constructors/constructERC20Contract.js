import abi from '../contracts/ERC20.abi.json'

export default (address) => window.web3.eth.contract(abi).at(address)
