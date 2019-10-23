pragma solidity ^0.5.8;

import "./ComptrollerInterface.sol";
import "./EIP20Interface.sol";
import "./Exponential.sol";
import "./ErrorReporter.sol";
import "./InterestRateModel.sol";
import "./ReentrancyGuard.sol";



interface EIP20NonStandardInterface {
    function totalSupply() external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256 balance);
    function transfer(address dst, uint256 amount) external;
    function transferFrom(address src, address dst, uint256 amount) external;
    function approve(address spender, uint256 amount) external returns (bool success);
    function allowance(address owner, address spender) external view returns (uint256 remaining);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
}


interface CToken is EIP20Interface, Exponential, TokenErrorReporter, ReentrancyGuard {
    bool public constant isCToken = true;
    string public name;
    string public symbol;
    uint public decimals;
    uint constant borrowRateMaxMantissa = 5e14;
    uint constant reserveFactorMaxMantissa = 1e18;
    address payable public admin;
    address payable public pendingAdmin;
    ComptrollerInterface public comptroller;
    InterestRateModel public interestRateModel;
    uint public initialExchangeRateMantissa;
    uint public reserveFactorMantissa;
    uint public accrualBlockNumber;
    uint public borrowIndex;
    uint public totalBorrows;
    uint public totalReserves;
    uint256 public totalSupply;
    mapping (address => uint256) accountTokens;
    mapping (address => mapping (address => uint256)) transferAllowances;
    struct BorrowSnapshot {
        uint principal;
        uint interestIndex;
    }
    mapping(address => BorrowSnapshot) accountBorrows;
    event AccrueInterest(uint interestAccumulated, uint borrowIndex, uint totalBorrows);
    event Mint(address minter, uint mintAmount, uint mintTokens);
    event Redeem(address redeemer, uint redeemAmount, uint redeemTokens);
    event Borrow(address borrower, uint borrowAmount, uint accountBorrows, uint totalBorrows);
    event RepayBorrow(address payer, address borrower, uint repayAmount, uint accountBorrows, uint totalBorrows);
    event LiquidateBorrow(address liquidator, address borrower, uint repayAmount, address cTokenCollateral, uint seizeTokens);
    event NewPendingAdmin(address oldPendingAdmin, address newPendingAdmin);
    event NewAdmin(address oldAdmin, address newAdmin);
    event NewComptroller(ComptrollerInterface oldComptroller, ComptrollerInterface newComptroller);
    event NewMarketInterestRateModel(InterestRateModel oldInterestRateModel, InterestRateModel newInterestRateModel);
    event NewReserveFactor(uint oldReserveFactorMantissa, uint newReserveFactorMantissa);
    event ReservesReduced(address admin, uint reduceAmount, uint newTotalReserves);

    function transferTokens(address spender, address src, address dst, uint tokens) external returns (uint);
    function transfer(address dst, uint256 amount) external nonReentrant returns (bool);
    function transferFrom(address src, address dst, uint256 amount) external nonReentrant returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256);
    function balanceOfUnderlying(address owner) external returns (uint);
    function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint);
    function getBlockNumber() external view returns (uint);
    function borrowRatePerBlock() external view returns (uint);
    function supplyRatePerBlock() external view returns (uint);
    function totalBorrowsCurrent() external nonReentrant returns (uint);
    function borrowBalanceCurrent(address account) external nonReentrant returns (uint);
    function borrowBalanceStored(address account) public view returns (uint);
    function borrowBalanceStoredInternal(address account) external view returns (MathError, uint);
    function exchangeRateCurrent() public nonReentrant returns (uint);
    function exchangeRateStored() public view returns (uint);
    function exchangeRateStoredInternal() external view returns (MathError, uint);
    function getCash() external view returns (uint);
    struct AccrueInterestLocalVars {
        MathError mathErr;
        uint opaqueErr;
        uint borrowRateMantissa;
        uint currentBlockNumber;
        uint blockDelta;

        Exp simpleInterestFactor;

        uint interestAccumulated;
        uint totalBorrowsNew;
        uint totalReservesNew;
        uint borrowIndexNew;
    }
    function accrueInterest() public returns (uint);
    function mintInternal(uint mintAmount) external nonReentrant returns (uint);
    struct MintLocalVars {
        Error err;
        MathError mathErr;
        uint exchangeRateMantissa;
        uint mintTokens;
        uint totalSupplyNew;
        uint accountTokensNew;
    }
    function mintFresh(address minter, uint mintAmount) external returns (uint);
    function redeemInternal(uint redeemTokens) external nonReentrant returns (uint);
    function redeemUnderlyingInternal(uint redeemAmount) external nonReentrant returns (uint);
    struct RedeemLocalVars {
        Error err;
        MathError mathErr;
        uint exchangeRateMantissa;
        uint redeemTokens;
        uint redeemAmount;
        uint totalSupplyNew;
        uint accountTokensNew;
    }
    function redeemFresh(address payable redeemer, uint redeemTokensIn, uint redeemAmountIn) external returns (uint);
    function borrowInternal(uint borrowAmount) external nonReentrant returns (uint);
    struct BorrowLocalVars {
        Error err;
        MathError mathErr;
        uint accountBorrows;
        uint accountBorrowsNew;
        uint totalBorrowsNew;
    }
    function borrowFresh(address payable borrower, uint borrowAmount) external returns (uint);
    function repayBorrowInternal(uint repayAmount) external nonReentrant returns (uint);
    function repayBorrowBehalfInternal(address borrower, uint repayAmount) external nonReentrant returns (uint);
    struct RepayBorrowLocalVars {
        Error err;
        MathError mathErr;
        uint repayAmount;
        uint borrowerIndex;
        uint accountBorrows;
        uint accountBorrowsNew;
        uint totalBorrowsNew;
    }
    function repayBorrowFresh(address payer, address borrower, uint repayAmount) external returns (uint);
    function liquidateBorrowInternal(address borrower, uint repayAmount, CToken cTokenCollateral) external nonReentrant returns (uint);
    function liquidateBorrowFresh(address liquidator, address borrower, uint repayAmount, CToken cTokenCollateral) external returns (uint);
    function seize(address liquidator, address borrower, uint seizeTokens) external nonReentrant returns (uint);
    function _setPendingAdmin(address payable newPendingAdmin) external returns (uint);
    function _acceptAdmin() external returns (uint);
    function _setComptroller(ComptrollerInterface newComptroller) public returns (uint);
    function _setReserveFactor(uint newReserveFactorMantissa) external nonReentrant returns (uint);
    function _setReserveFactorFresh(uint newReserveFactorMantissa) external returns (uint);
    function _reduceReserves(uint reduceAmount) external nonReentrant returns (uint);
    function _reduceReservesFresh(uint reduceAmount) external returns (uint);
    function _setInterestRateModel(InterestRateModel newInterestRateModel) public returns (uint);
    function _setInterestRateModelFresh(InterestRateModel newInterestRateModel) external returns (uint);
    function getCashPrior() external view returns (uint);
    function checkTransferIn(address from, uint amount) external view returns (Error);
    function doTransferIn(address from, uint amount) external returns (Error);
    function doTransferOut(address payable to, uint amount) external returns (Error);
}


interface CErc20 is CToken {
    address public underlying;
    function mint(uint mintAmount) external returns (uint);
    function redeem(uint redeemTokens) external returns (uint);
    function redeemUnderlying(uint redeemAmount) external returns (uint);
    function borrow(uint borrowAmount) external returns (uint);
    function repayBorrow(uint repayAmount) external returns (uint);
    function repayBorrowBehalf(address borrower, uint repayAmount) external returns (uint);
    function liquidateBorrow(address borrower, uint repayAmount, CToken cTokenCollateral) external returns (uint);
    function getCashPrior() external view returns (uint);
    function checkTransferIn(address from, uint amount) external view returns (Error);
    function doTransferIn(address from, uint amount) external returns (Error);
    function doTransferOut(address payable to, uint amount) external returns (Error);
}
