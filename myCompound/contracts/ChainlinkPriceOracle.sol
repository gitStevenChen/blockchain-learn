// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/PriceOracle.sol";
import "./interface/CToken.sol";

contract ChainlinkPriceOracle is Ownable, PriceOracle {
    mapping(address => AggregatorV3Interface) internal priceFeedMap;

    function setPriceFeed(address token, address priceFeed) external onlyOwner {
        priceFeedMap[token] = AggregatorV3Interface(priceFeed);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice(address token) public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeedMap[token].latestRoundData();
        return price;
    }

    function getUnderlyingPrice(CToken cToken) external view override returns (uint) {
        address token = address(cToken.underlying());
        require(token != address(0), "token is not set");
        return uint(getLatestPrice(token));
    }

}