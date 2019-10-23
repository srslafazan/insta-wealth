const { toWei, fromWei, padLeft, numberToHex } = web3.utils;

const toSecs = require('@mblackmblack/to-seconds');
const BN = require('bignumber.js')

var ExampleDaiCoin = artifacts.require("./ExampleDaiCoin.sol");
var ExampleUsdcCoin = artifacts.require("./ExampleUsdcCoin.sol");
var Medianizer = artifacts.require('./MedianizerExample.sol');
var Funds = artifacts.require('./Funds.sol');
var Loans = artifacts.require('./Loans.sol');
var Sales = artifacts.require('./Sales.sol');

var DAIInterestRateModel = artifacts.require('./DAIInterestRateModel.sol')
var USDCInterestRateModel = artifacts.require('./USDCInterestRateModel.sol')
var ETHInterestRateModel = artifacts.require('./ETHInterestRateModel.sol')
var Unitroller = artifacts.require('./Unitroller.sol')
var Comptroller = artifacts.require('./Comptroller.sol')
var CErc20 = artifacts.require('./CErc20.sol')
var CEther = artifacts.require('./CEther.sol')
var PriceOracleProxy = artifacts.require('./PriceOracleProxy.sol')
var PriceOracle = artifacts.require('./_PriceOracle.sol')
var MakerMedianizer = artifacts.require('./_MakerMedianizer.sol')

var TCompound = artifacts.require('./TCompound.sol')

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(ExampleDaiCoin); // LOCAL
    var dai = await ExampleDaiCoin.deployed(); // LOCAL
    await deployer.deploy(ExampleUsdcCoin);
    var usdc = await ExampleUsdcCoin.deployed();

    await deployer.deploy(MakerMedianizer) // LOCAL
    var makerMedianizer = await MakerMedianizer.deployed(); // LOCAL
    await makerMedianizer.poke(padLeft(numberToHex(toWei('200', 'ether')), 64)) // LOCAL

    await deployer.deploy(DAIInterestRateModel, toWei('0.05', 'ether'), toWei('0.12', 'ether'))
    await deployer.deploy(USDCInterestRateModel, toWei('0', 'ether'), toWei('0.2', 'ether'))
    await deployer.deploy(ETHInterestRateModel, toWei('0', 'ether'), toWei('0.2', 'ether'))
    var daiInterestRateModel = await DAIInterestRateModel.deployed()
    var usdcInterestRateModel = await USDCInterestRateModel.deployed()
    var ethInterestRateModel = await ETHInterestRateModel.deployed()

    await deployer.deploy(Unitroller)
    var unitroller = await Unitroller.deployed()

    await deployer.deploy(Comptroller)
    var comptroller = await Comptroller.deployed()

    await unitroller._setPendingImplementation(comptroller.address)
    await unitroller._acceptImplementation()
    await comptroller._setLiquidationIncentive(toWei('1.05', 'ether'))
    await comptroller._setMaxAssets(10)

    await deployer.deploy(CErc20, dai.address, comptroller.address, daiInterestRateModel.address, toWei('0.2', 'gether'), 'Compound Dai', 'cDAI', '8')
    var cdai = await CErc20.deployed()

    var cusdc = await CErc20.new(usdc.address, comptroller.address, usdcInterestRateModel.address, toWei('0.2', 'finney'), 'Compound Usdc', 'cUSDC', '8')

    await deployer.deploy(CEther, comptroller.address, ethInterestRateModel.address, toWei('0.2', 'gether'), 'Compound Ether', 'cETH', '8')
    var ceth = await CEther.deployed()

    await comptroller._supportMarket(cdai.address)
    await comptroller._supportMarket(cusdc.address)
    await comptroller._supportMarket(ceth.address)

    await deployer.deploy(PriceOracle, accounts[0], dai.address, makerMedianizer.address, usdc.address, makerMedianizer.address)
    var priceOracle = await PriceOracle.deployed()

    await deployer.deploy(PriceOracleProxy, comptroller.address, priceOracle.address, ceth.address)
    var priceOracleProxy = await PriceOracleProxy.deployed()

    await priceOracle.setPrices([padLeft(numberToHex(1), 40)], [toWei('0.0049911026', 'ether')])
    await priceOracle.setPrices([padLeft(numberToHex(2), 40)], [toWei('0.0049911026', 'ether')])

    await comptroller._setPriceOracle(priceOracleProxy.address)
    await comptroller._setCollateralFactor(ceth.address, toWei('0.75', 'ether'))

    await comptroller.enterMarkets([cdai.address, cusdc.address, ceth.address])

    await dai.approve(cdai.address, toWei('100', 'ether'))
    await cdai.mint(toWei('100', 'ether'))

    await usdc.approve(cusdc.address, toWei('100', 'mwei'))
    await cusdc.mint(toWei('100', 'mwei'))

    await deployer.deploy(Medianizer);
    var medianizer = await Medianizer.deployed();

    // await deployer.deploy(TCompound, comptroller.address) // LOCAL

    console.log("DAI_ADDRESS", dai.address)
    console.log("USDC_ADDRESS", usdc.address)
    console.log("CDAI_ADDRESS", cdai.address)
    console.log("CUSDC_ADDRESS", cusdc.address)

    console.log('==================================')

    console.log("DAI", dai.address)
    console.log("USDC", usdc.address)
    console.log("CDAI", cdai.address)
    console.log("CUSDC", cusdc.address)
  })
};
