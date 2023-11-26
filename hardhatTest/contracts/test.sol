// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract proxy1 {
    // 合约参数
    address public admin;
    address public logic;

    constructor (address _admin, address _logic) {
        admin = _admin;
        logic = _logic;
    }

    fallback () external{
        require(msg.sender != admin, "admin do not fallback");
        bytes memory code = abi.encodeWithSelector(bytes4(msg.data), msg.data);
        (bool ans, bytes memory anscode) = logic.delegatecall(code);
        bytes memory result = abi.encode(anscode);

    }

    // 可升级逻辑
    function updateLogic (address newLogic) public {
        require(msg.sender == admin, "no admin no do updateLogic");
        logic = newLogic;
        // returns(logic);
    }
}