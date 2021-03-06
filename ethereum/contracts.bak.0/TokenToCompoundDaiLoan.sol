// All code examples in this guide have not been audited and should not be used in production.
// If so, it is done at your own risk!

pragma solidity ^0.5.12;

import "./ERC20.sol";
import "../contracts/CErc20.sol";
import "./KyberNetworkProxy.sol";
import "../contracts/CompoundModule.sol";


contract TokenToCompoundDaiLoan {

    // event Swap(address indexed sender, ERC20 srcToken, ERC20 destToken, uint amount);

    // CompoundFinanceProxy public compoundProxy = CompoundFinanceProxy(0xA57B8a5584442B467b4689F1144D269d096A3daF);
    KyberNetworkProxy public kyberProxy = KyberNetworkProxy(0xA57B8a5584442B467b4689F1144D269d096A3daF);
    // CompoundModule public compound = CompoundModule(0xA57B8a5584442B467b4689F1144D269d096A3daF);
    CErc20 public cDai = CErc20(ADDR);
    ERC20 constant internal ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    // Events
    event Swap(address indexed sender, ERC20 srcToken, ERC20 destToken, uint destAmount);


    // ERC20 constant internal ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    function getConversionRates(ERC20 srcToken, uint srcQty, ERC20 destToken) public view returns (uint, uint) {
      return kyberProxy.getExpectedRate(srcToken, destToken, srcQty);
    }

    // @dev Swap the user's ERC20 token to another ERC20 token
    // @param srcToken source token contract address
    // @param srcQty amount of source tokens
    // @param destToken destination token contract address
    // @param destAddress address to send swapped tokens to
    function execSwap(ERC20 srcToken, uint srcQty, ERC20 destToken, address destAddress) public {
        uint minConversionRate;

        // Check that the token transferFrom has succeeded
        require(srcToken.transferFrom(msg.sender, address(this), srcQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(srcToken.approve(address(kyberProxy), 0));

        // Set the spender's token allowance to tokenQty
        require(srcToken.approve(address(kyberProxy), srcQty));

        // Get the minimum conversion rate
        (minConversionRate,) = kyberProxy.getExpectedRate(srcToken, ETH_TOKEN_ADDRESS, srcQty);

        // Swap the ERC20 token to ETH
        uint destAmount = kyberProxy.swapTokenToToken(srcToken, srcQty, destToken, minConversionRate);

        // Send the swapped tokens to the destination address
        require(destToken.transfer(destAddress, destAmount));

        // Log the event
        emit Swap(msg.sender, srcToken, destToken, destAmount);
    }

    //
    function swapTokenToCompoundLoan(ERC20 srcToken, uint srcQty) public view returns (uint) {
        kyberProxy.execSwap(...)
        compoundProxy.mint(...)
    }
}
