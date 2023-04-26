// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
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
      url: 'https://eth-goerli.g.alchemy.com/v2/7j7b4yOicoidzKfLjUuT2lCHKCsad4g1',
      accounts: PRIVATE_KEY,
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: PRIVATE_KEY,
    },
  },
  etherscan: {
    apiKey: {
      goerli: "7j7b4yOicoidzKfLjUuT2lCHKCsad4g1",
      sepolia: SEPOLIA_API_KEY,
    },
  },
};
