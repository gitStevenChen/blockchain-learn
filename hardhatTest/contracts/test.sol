// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract TransparentProxy {
    // 合约参数
    address public admin;
    address public logic;

    constructor (address _admin, address _logic) {
        admin = _admin;
        logic = _logic;
    }

    fallback() external payable {
        require(msg.sender != admin, "admin do not fallback");
        (bool success, bytes memory data) = logic.delegatecall(msg.data);
    }

    // 可升级逻辑
    function updateLogic (address newLogic) public {
        require(msg.sender == admin, "no admin no do updateLogic");
        logic = newLogic;
        console.log("newLogic is %s ", logic);

    }
}