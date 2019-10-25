pragma solidity ^0.5.8;

import './ERC20.sol';
// import './KyberNetworkProxy.sol';


interface SwapEtherToToken {
    event Swap(address indexed sender, ERC20 destToken, uint amount);
    function execSwap(ERC20 token, address destAddress) external payable;
}

interface SwapTokenToEther {
    event Swap(address indexed sender, ERC20 srcToken, uint amount);
    function execSwap(ERC20 token, uint tokenQty, address destAddress) external;
}


interface SwapTokenToToken {
    event Swap(address indexed sender, ERC20 srcToken, ERC20 destToken, uint amount);
    function execSwap(ERC20 srcToken, uint srcQty, ERC20 destToken, address destAddress) external;
}

