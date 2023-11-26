require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

//私钥
const PRIVATE_KEY = [process.env.PRIVATE_KEY];
//mainnet
const MAINNET_URL = process.env.MAINNET_URL;
//sepolia
const SEPOLIA_URL = process.env.SEPOLIA_URL;
const SEPOLIA_API_KEY = process.env.SEPOLIA_API_KEY;
//goerli
const GOERLI_URL = process.env.GOERLI_URL;
const GOERLI_API_KEY = process.env.GOERLI_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7"
      },
      {
        version: "0.8.9",
        settings: { } 
      }
    ]
  },
  networks: {
    hardhat: {
      forking: {
        url: MAINNET_URL,
        blockNumber: 18564155
      }
    },
    goerli: {
      url: GOERLI_URL,
      accounts: PRIVATE_KEY,
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: PRIVATE_KEY,
    },
  },
  etherscan: {
    apiKey: {
      goerli: GOERLI_API_KEY,
      sepolia: SEPOLIA_API_KEY,
    },
  },
};
