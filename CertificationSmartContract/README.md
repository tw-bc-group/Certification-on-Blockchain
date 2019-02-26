# Certification Smart Contract

## Launch

### Installation

```shell
npm install
```

### Start Local Chain

It will start a local blockchain by `ganache` on port `8545`.

```shell
npm start
```

### Compile & Deploy

You can choose to deploy on environments:

- Development
- Test(Ropsten)

by running

```shell
npm run deploy:dev
```

or

```shell
npm run deploy:test
```

## Test

** You need make sure the chain is launched by `npm start`. **

```shell
npm test
```