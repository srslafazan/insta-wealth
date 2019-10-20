const contructContract = (abi, address = null, options = {}) => window.web3.eth.contract(abi, address, options)

export default contructContract
