// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/**
 * @title 使用openzeppelin写的ERC20合约
 * @author steven_chen
 * @notice ERC20基本 接口：1个授权+2个事件+2个交易(普通转账和授权转账)+3个查询(查余额、查总数、查授权额度)
 *         状态变量：账户余额、授权额度、代币信息（总额、名称、代号、小数位数）
 */
contract CQPToken is ERC20,Ownable {
    /// 第一版：实现基础功能，在上述基础上增加有上限的懒汉式增加总额、安全访问控制、铸造、销毁

    // token数量：实际数量*10**18
    uint256 private immutable cap; //代币上限
    constructor(uint256 _initialSupply, uint256 _cap) ERC20("MyERC20Token", "CQP20") {
        require(_initialSupply <= _cap, "Initial supply must be less than or equal to cap");
        cap = _cap;
        _mint(msg.sender, _initialSupply);
    }

    //铸造
    function mint(address _account, uint256 _amount) public onlyOwner {
        require(totalSupply() + _amount <= cap, "mint: cap exceeded");
        _mint(_account, _amount);
    }

    //销毁
    function burn(address _account, uint256 _amount) public onlyOwner {
        _burn(_account, _amount);
    }

    function totalCap() public view virtual returns (uint256) {
        return cap;
    }
}