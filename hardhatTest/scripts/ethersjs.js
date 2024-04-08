const ethers = require("ethers");
require("dotenv").config();

// 1、设置provider
// 2、构造合约对象contract，或者通过ContractFactory来部署合约
// 3、创建signer或者wallet转账，也可以和合约交互
// 4、contract.queryFilter 来检索事件，contract.on 来监听事件，contract.filters 来过滤事件，
// 5、staticCall contract.函数名.staticCall() 可以模拟一笔交易，并返回可能的交易结果，但不真正在区块链上执行它（交易不上链）。
// 6、

//mainnet
// const MAINNET_URL = process.env.MAINNET_URL;
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';

// const provider = ethers.getDefaultProvider();
// const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
const providerLocal = new ethers.JsonRpcProvider("https//:localhost:8545");



const main = async () => {
    // const balance = await provider.getBalance(`vitalik.eth`);
    // console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);

    console.log("\n3. 查询区块高度")
    const blockNumber = await providerLocal.getBlockNumber();
    console.log(blockNumber);
}
main()