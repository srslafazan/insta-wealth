# Webclient


## Dependencies
- Docker
- Docker Compose


## File Structure

```
    .
    │
    ├── compound - Compound Finance contracts
    ├── constants
    ├── constructors
    ├── components
    │       ├── App.js - client application root component
    │       └── ...
    │
    ├── context - React context
    ├── contracts - Truffle contracts
    ├── constructors
    ├── kyber - Kyber Network contracts
    ├── migrations - Truffle migrations
    ├── pages
    │     ├── _app.js
    │     ├── _document.js
    │     ├── ...
    │     └── index.js
    │
    ├── public
    ├── server - NextJS webserver
    ├── styles
    ├── test - Truffle tests
    ├── tests
    │     ├── integration
    │     └── unit
    │
    └── utils

```

## Setup

```bash
yarn setup # installs dependencies and compiles contracts
```

## Migrations

```bash
yarn ganache # runs ganache-cli ethereum node mock
yarn migrate # runs all migrations
```


## Run

```bash
yarn ganache
yarn dev # runs dev webserver
open http://127.0.0.1:3000
```


## Test

Tests are split into unit and integration.

```bash
yarn test:unit  # matches ( test/unit/*.test.js | **/unit.test.js )
yarn test:unit:watch
yarn test:integration # matches ( test/integration/*.test.js | **/integration.test.js )
yarn test:integration:watch
```


## Production

```bash
yarn start
```


## License

See LICENSE
