export const getNetworkName = () => {
  switch (ethereum.networkVersion) {
    case '0': return 'Olympic' // Olympic, Ethereum public pre-release PoW testnet
    // case '1': return 'Frontier' // Frontier, Homestead, Metropolis, the Ethereum public PoW main network
    // case '1': return 'Classic' // Classic, the (un)forked public Ethereum Classic PoW main network, chain ID 61
    case '1': return 'Mainnet' // Expanse, an alternative Ethereum implementation, chain ID 2
    case '2': return 'Morden' // Morden Classic, the public Ethereum Classic PoW testnet
    case '3': return 'Ropsten' // Ropsten, the public cross-client Ethereum PoW testnet
    case '4': return 'Rinkeby' // Rinkeby, the public Geth-only PoA testnet
    case '5': return 'Goerli' // Goerli, the public cross-client PoA testnet
    case '6': return 'Kotti' // Kotti Classic, the public cross-client PoA testnet for Classic
    case '8': return 'Ubiq' // Ubiq, the public Gubiq main network with flux difficulty chain ID 8
    case '42': return 'Kovan' // Kovan, the public Parity-only PoA testnet
    case '60': return 'GoChain' // GoChain, the GoChain networks mainnet
    case '77': return 'Sokol' // Sokol, the public POA Network testnet
    case '99': return 'Core' // Core, the public POA Network main network
    case '100': return 'xDai' // xDai, the public MakerDAO/POA Network main network
    case '31337': return 'GoChain' // GoChain testnet, the GoChain networks public testnet
    case '401697': return 'Tobalaba' // Tobalaba, the public Energy Web Foundation testnet
    case '7762959': return 'Musicoin' // Musicoin, the music blockchain
    case '61717561': return 'Aquachain' // Aquachain, ASIC resistant chain
    default: return 'Development' // Could indicate that your connected to a local development test network.
  }
}

export function getContractAddressesForNetwork(network) {
    switch (network) {
        case '1': return {
            DAI: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359', // 0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359
            USDC: '0x1B9E43e5f8724803A38dD87Ec78CEdF89808AcAe',
            WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
            cDAI: '0xF5DCe57282A584D2746FaF1593d3121Fcac444dC',
        }
        case '3': return {}
        case '4': return {}
        case '42': return {}
        default: return {}
    }
}

export function getContractAddressForAsset(asset) {
    return getContractAddressesForNetwork(web3.currentProvider.networkVersion)[asset]
}

