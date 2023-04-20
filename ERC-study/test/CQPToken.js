const { expect } = require("chai");

describe("CQPToken", function() {
  //可以定义全局变量
  var cqpToken;
  var owner;
  var addr1;
  const total_supply = ethers.utils.parseEther("1000");
  const total_cap = ethers.utils.parseEther("10000");

  //定义beforeEach, 初始化环境
  beforeEach(async () => {
    //模拟两个地址
    [owner, addr1] = await ethers.getSigners();

    const CQPToken = await ethers.getContractFactory("CQPToken");
    // deploy()参数的值是合约构造函数参数的值
    cqpToken = await CQPToken.deploy(ethers.utils.parseEther("1000"), ethers.utils.parseEther("10000"));
  });

  // "it" is a single test case - give it a descriptive name
  //铸造和销毁
  it("Should be mint a CQPToken successful", async function() {
    //确定部署完成
    await cqpToken.deployed();
    await cqpToken.mint(addr1.address, ethers.utils.parseEther("10"));
    await cqpToken.burn(addr1.address, ethers.utils.parseEther("3"));
    expect(await cqpToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("7"));
  });

  //两个交易
  it("Should be tranfer a CQPToken successful", async function() {
    await cqpToken.connect(owner).transfer(addr1.address, ethers.utils.parseEther("10"));
    expect(await cqpToken.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("990"));
  });

  //三个查询
  it("Should check successful", async function() {
    expect(await cqpToken.name()).to.equal("MyERC20Token");
    expect(await cqpToken.symbol()).to.equal("CQP20");
    expect(await cqpToken.decimals()).to.equal(18);
    expect(await cqpToken.totalSupply()).to.equal(total_supply);
    expect(await cqpToken.totalCap()).to.equal(total_cap);
  });
});