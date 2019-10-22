pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
// import "../compound/contracts/development/Compound/FakeCDai.sol";
// import "../compound/contracts/development/Compound/FakeCDaiInterestRateModel.sol";
// import "../compound/contracts/development/Compound/FakeComptroller.sol";
// import "../compound/contracts/development/Compound/FakeCEther.sol";
// import "../compound/contracts/development/Compound/FakeCEtherInterestRateModel.sol";
// import "../compound/contracts/development/FakeDai.sol";
// import "../compound/contracts/development/Compound/src/Comptroller.sol";
// import "../compound/contracts/development/Compound/src/WhitePaperInterestRateModel.sol";

// contract FakeComptroller is Comptroller {}

// import "./compound/contracts/development/Compound/src/ErrorReporter.sol";
// import "./compound/contracts/development/Compound/src/Exponential.sol";
// import "../compound/contracts/development/Compound/src/Comptroller.sol";
// import "../compound/contracts/development/Compound/src/CToken.sol";
// import "../compound/contracts/development/Compound/src/ErrorReporter.sol";
// import "../compound/contracts/development/Compound/src/Exponential.sol";
// import "../compound/contracts/development/Compound/src/PriceOracle.sol";
// import "../compound/contracts/development/Compound/src/ComptrollerInterface.sol";
// import "../compound/contracts/development/Compound/src/ComptrollerStorage.sol";
// import "../compound/contracts/development/Compound/src/Unitroller.sol";

// contract FakeComptroller is ComptrollerV1Storage, ComptrollerInterface, ComptrollerErrorReporter, Exponential {}
// contract FakeComptroller is ComptrollerV1Storage, ComptrollerInterface, ComptrollerErrorReporter, Exponential {}


// contract FakeCDaiInterestRateModel is WhitePaperInterestRateModel {
//     constructor()
//     WhitePaperInterestRateModel(
//       0.05 * (10 ** 18),
//       0.12 * (10 ** 18)
//     )
//     public
//     {}
// }

// contract FakeCDai is CErc20 {
//     constructor(
//       address _token,
//       ComptrollerInterface _comptroller,
//       InterestRateModel _interestRateModel
//     )
//     CErc20(
//       _token,
//       _comptroller,
//       _interestRateModel,
//       200000000 * (10 ** 18),
//       "Fake Compound Dai",
//       "cDAI",
//       8
//     )
//     public
//     {}
// }

contract TestFakeCDai {

  address public addr = 0xCfEB869F69431e42cdB54A4F4f105C19C080A601;

  // FakeComptroller public comptroller = new FakeComptroller();

  // InterestRateModel public interestRateModel = new FakeCDaiInterestRateModel();

  // FakeCDai public cdai = new FakeCDai(
  //   addr,
  //   comptroller,
  //   interestRateModel
  // );

  function testSanity() public {
    // Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 FakeComptroller initially");
    // meta.getBalance(tx.origin)
    Assert.equal(true, true, "Sanity is sane");
  }


  // function testCdai() public {
    // cdai = new FakeCDai(
    //   addr,
    //   comptroller,
    //   interestRateModel
    // );
  // }

}
