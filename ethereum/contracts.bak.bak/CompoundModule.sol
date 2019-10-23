pragma solidity ^0.5.8;

import './SafeMath.sol';
import './CompoundHelper.sol';


contract CompoundModule is DSMath, CompoundHelper {
    address owner;
    // ERC20Interface token;
    // CERC20Interface cToken;

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint256 _amount, address _underlying, address _cToken) public {
        ERC20Interface underlying = ERC20Interface(_underlying); // get a handle for the underlying asset contract
        CERC20Interface cToken = CERC20Interface(_cToken); // get a handle for the corresponding cToken contract
        underlying.approve(_cToken, _amount); // approve the transfer
        assert(cToken.mint(_amount) == 0); // mint the cTokens and assert there is no error
        // require(token.transferFrom(msg.sender, address(this), amount));
        // mintCToken(address(token), address(cToken), amount);
    }

    // function withdraw(uint256 _amount, address _underlying, address _cToken) external {
    //     withdrawTo(_amount, _underlying, _cToken, msg.sender);
    // }

    // function withdrawTo(uint256 _amount, address _underlying, address _cToken, address _recipient) public {
    //     // require(msg.sender     == lender(fund)); // TODO - ensure withdrawer is lender
    //     // require(balance(fund)  >= amount); // TODO - handle balance size
    //     redeemUnderlying(_cToken, _amount);
    //     require(_underlying.transfer(_recipient, _amount));
    // }

}
