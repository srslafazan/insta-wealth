pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/development/Compound/FakeComptroller.sol";
import "../contracts/development/Compound/FakeCDai.sol";
import "../contracts/development/Compound/FakeCDaiInterestRateModel.sol";

contract TestFakeCDai {

  address public addr;

  FakeComptroller public comptroller;

  InterestRateModel public interestRateModel;

  FakeCDai public cdai;

  function testSanity() public {
    // Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 FakeComptroller initially");
    // meta.getBalance(tx.origin)
    Assert.equal(true, true, "Sanity is sane");
  }

  constructor() public {
    addr =  0xCfEB869F69431e42cdB54A4F4f105C19C080A601;
    comptroller = new FakeComptroller();
    interestRateModel = new FakeCDaiInterestRateModel();
  }

  function testCdai() public {
    // cdai = new FakeCDai(
    //   addr,
    //   comptroller,
    //   interestRateModel
    // );
  }

}
