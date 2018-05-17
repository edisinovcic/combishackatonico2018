pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract CombisToken is MintableToken {
    string public name = "Combis Token";
    string public symbol = "CMT";
    uint8 public decimals = 18;
}

