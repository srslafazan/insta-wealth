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
