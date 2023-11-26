const ethers = require("ethers");
require("dotenv").config();

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