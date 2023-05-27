// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
// require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

//私钥
const PRIVATE_KEY = [process.env.PRIVATE_KEY];
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
        version: "0.8.18"
      },
      {
        version: "0.8.9"
      },
    ],
  },
  networks: {
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
