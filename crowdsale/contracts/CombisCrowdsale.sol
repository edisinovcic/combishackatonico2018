pragma solidity 0.4.23;

import "./CombisToken.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract CombisCrowdsale is MintedCrowdsale, Ownable {

    uint256 public constant RATE = 1000;
    uint256 public constant SELLABLE_TOKEN_AMOUNT = 50 * (10 ** 6) * (10 ** 18);

    uint256 public constant MIN_BONUS_WEI_AMOUNT = 2 * (10 ** 18);
    uint256 public constant BONUS_RATE = 50; // percentage (50%)

    function CombisCrowdsale(
        CombisToken _token,
        address _wallet) public
    Crowdsale(RATE, _wallet, _token)
    {
    }

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        require(_beneficiary != address(0));
        require(_weiAmount != 0);

        uint256 currentTokenSupply = token.totalSupply();
        uint256 amountToMint = _getTokenAmount(_weiAmount);
        require(currentTokenSupply.add(amountToMint) <= SELLABLE_TOKEN_AMOUNT);

        super._preValidatePurchase(_beneficiary, _weiAmount);
    }

    function recoverERC20(ERC20 token, address refundee, uint256 amount) public onlyOwner {
        require(amount >= 0);
        token.transfer(refundee, amount);
    }

    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
        if (_weiAmount >= MIN_BONUS_WEI_AMOUNT) {
            uint256 bonusRate = rate.add(rate.mul(BONUS_RATE).div(100)); // bonusRate = bonusRate + bonusRate * 50/100
            return _weiAmount.mul(bonusRate);
        }
        return _weiAmount.mul(rate);
    }

}
