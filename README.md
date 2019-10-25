# InstaWealth


## Dependencies
- Docker
- Docker Compose


## File Structure

```
    .
    │
    ├── ethereum
    │       ├── compound - Compound Finance contracts
    │       ├── contracts - Truffle contracts
    │       ├── kyber - Kyber Network contracts
    │       ├── migrations - Truffle migrations
    │       └── test - Truffle tests
    │
    └── webclient
            ├── constants
            ├── constructors
            ├── components
            │       ├── App.js - client application root component
            │       └── ...
            │
            ├── context - React context
            ├── contracts - Truffle contract abi's
            ├── constructors
            ├── pages
            │     ├── _app.js
            │     ├── _document.js
            │     ├── ...
            │     └── index.js
            │
            ├── public
            ├── server - NextJS webserver
            ├── styles
            ├── tests
            │     ├── integration
            │     └── unit
            │
            └── utils

```


## License

See LICENSE


## Notes

- https://awesome.makerdao.com
- https://github.com/DecenterApps/cdpsaver-contracts
- https://github.com/dapphub/ds-proxy
- https://github.com/makerdao/mcd-cdp-handler/blob/master/src/CdpHandler.sol
- https://medium.com/dydxderivatives/dydx-launches-on-testnet-38b2812c56e
- docker https://www.alexandraulsh.com/2019/02/24/docker-build-secrets-and-npmrc/
- sudo killall -9 com.apple.CoreSimulator.CoreSimulatorService
- https://etherscan.io/address/0x7c29669dfdd4e7bef389fa153373dd8efaaa15b6
