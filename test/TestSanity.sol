pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestSanity {

  function testSanity() public {
    Assert.equal(true, true, "Sanity is sane");
  }

}
