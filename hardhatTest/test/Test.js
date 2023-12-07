const { ethers } = require("hardhat");
const { expect } = require("chai");
require("dotenv").config();
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');

let transparentProxy

describe("TransparentProxy", function () {

  before(async function () {
    const [owner, otherAccount] = await ethers.getSigners();
    const TransparentProxy = await ethers.getContractFactory("TransparentProxy");
    transparentProxy = await TransparentProxy.deploy(owner.address, otherAccount.address);
    await transparentProxy.deployed();
    console.log("owner:" + owner.address);
    console.log("otherAccount:" + otherAccount.address);
    console.log("TransparentProxy:" + transparentProxy.address);
  });

  it("测试更改合约", async function () {
    await transparentProxy.updateLogic(process.env.address1);
  });

});

