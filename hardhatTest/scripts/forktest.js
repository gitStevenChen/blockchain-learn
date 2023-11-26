const { ethers } = require("hardhat");

// 需要将 usdt 的 abi 保存在本地
const USDT_ABI = require("./usdt_abi.json");
// usdt 合约的主网地址
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// 模拟的账户地址，可以去链上查查余额多少
const mockAddress = "0x4c8CFE078a5B989CeA4B330197246ceD82764c63";
const myAddress = "0x55BedE004EC3A374504eDD5864594E79E555B92e";

let USDT; // USDT全局contract对象
let signer; // 签名账户对象，使用对象做任何交互操作，如转账、授权、调用合约
let owners; // 本地账户对象

describe("Fork", function () {

  // 钩子函数，每次测试都会提前运行进行
  beforeEach(async function () {
    const provider = ethers.provider;
    // 构造 usdt 合约对象
    USDT = new ethers.Contract(USDT_ADDRESS, USDT_ABI, provider);
	
	  // hardhat本地网络模拟账户设置
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [mockAddress],
    });
    
    // 获取签名的账户对象
    signer = await ethers.provider.getSigner(mockAddress);
    signer1 = await ethers.provider.getSigner(myAddress);

    const [owner] = await ethers.getSigners();
    owners = owner;

    // 设置账户余额
    await network.provider.send("hardhat_setBalance", [
      "0x55BedE004EC3A374504eDD5864594E79E555B92e",
      "0x1000",
    ]);
  })


  it("Testing fork data", async function () {
    //看区块数来验证是否成功fork
    console.log((await ethers.provider.getBlockNumber()).toString());
    // 调用 usdt 的 totalSupply
    let totalSupply = await USDT.totalSupply();
    console.log(totalSupply.toString());
  });


  it("模拟测试账户", async() =>{
    // 地址的账户信息
    let ETHBalance = await signer.getBalance();
    console.log(`ETH balance is ${ETHBalance.toString() / 1e18}`);

    let USDTBalance = await USDT.balanceOf(signer.getAddress()) / 1e6;
    console.log(`USDT balance is ${USDTBalance.toString()}`);

    // 我的地址
    ETHBalance = await signer1.getBalance();
    console.log(`my ETH balance is ${ETHBalance.toString() / 1e18}`);

    USDTBalance = await USDT.balanceOf(signer1.getAddress()) / 1e6;
    console.log(`my USDT balance is ${USDTBalance.toString()}`);
  })


  // it("转账操作测试", async() =>{
  //   // 打印转账前的账户余额
  //   let USDTBalanceA = await USDT.balanceOf(signer.getAddress()) / 1e6;
  //   console.log(`USDT balance before transfer is ${USDTBalanceA.toString()}`);

  //   const recipient = "0x55BedE004EC3A374504eDD5864594E79E555B92e";

  //   let USDTBalanceB = await USDT.balanceOf(recipient) / 1e6;
  //   console.log(`USDT balance of recipient before transfer is ${USDTBalanceB.toString()}`);

  //   console.log("========Transfering========");

  //   // 转账操作
  //   await USDT.connect(signer).transfer(
  //     "0x55BedE004EC3A374504eDD5864594E79E555B92e",
  //     ethers.utils.parseUnits("5", 6)
  //   );

  //   // 打印转账后的账户余额
  //   USDTBalanceA = await USDT.balanceOf(signer.getAddress()) / 1e6;
  //   console.log(`USDT balance after transfer is ${USDTBalanceA.toString()}`);

  //   USDTBalanceB = await USDT.balanceOf(recipient) / 1e6;
  //   console.log(`USDT balance of recipient after transfer is ${USDTBalanceB.toString()}`);
  // })

});