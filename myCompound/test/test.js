const { expect } = require("chai");

describe("PriceConsumerV3", function() {
  //可以定义全局变量
  var priceConsumerV3;
  var owner;
  var addr1;
  let a;
  const total_supply = ethers.utils.parseEther("1000");
  const total_cap = ethers.utils.parseEther("10000");

  //定义beforeEach, 初始化环境
  beforeEach(async () => {
    //模拟两个地址
    [owner, addr1] = await ethers.getSigners();

    const PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3");
    // deploy()参数的值是合约构造函数参数的值
    priceConsumerV3 = await PriceConsumerV3.deploy();
  });

  // "it" is a single test case - give it a descriptive name
  //chainlink查价格
  it("Should be check a token prices successful", async function() {
    //确定部署完成
    await priceConsumerV3.deployed();
    // await priceConsumerV3.getLatestPrice();
    // expect(await priceConsumerV3.getLatestPrice()).to.equal(ethers.utils.parseEther("10"));
    console.log(await priceConsumerV3.getLatestPrice());
  });
});