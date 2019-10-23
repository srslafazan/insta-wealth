const ExampleDaiCoin = artifacts.require("./ExampleDaiCoin.sol");
const CErc20 = artifacts.require('./CErc20.sol');
const CEther = artifacts.require('./CEther.sol');
const Comptroller = artifacts.require('./Comptroller.sol')
const TCompound = artifacts.require('./TCompound.sol');

const utils = require('./helpers/Utils.js');
const { rateToSec, numToBytes32, toBaseUnit } = utils;
const { toWei, fromWei } = web3.utils;

const stablecoins = [ { name: 'DAI', unit: 'ether' }, { name: 'USDC', unit: 'mwei' } ]


contract("TCompound", accounts => {
  beforeEach(async function () {
    this.token = await ExampleDaiCoin.deployed();
    this.cErc20 = await CErc20.deployed();
    this.cEther = await CEther.deployed();
    this.compound = await TCompound.deployed();
    this.comptroller = await Comptroller.deployed();

    console.log(this.token.address)
    console.log(this.cErc20.address)
    console.log(this.cEther.address)

  })

  stablecoins.forEach(({ name, unit }) => {
    contract(`${name} Compound`, accounts => {
      // const lender = accounts[0]
      // const borrower = accounts[1]
      // const arbiter = accounts[2]

      console.log(name, unit, accounts)

      describe('deposit', function() {
        it('should work', async function() {

          const result = await this.compound.mintCToken(this.token.address, this.cErc20.address, toWei('1', 'ether'))
          console.log(result)
          // assert.equal(true, true)
        })

      })
    })

  })


})
