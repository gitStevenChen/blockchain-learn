// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const CQPToken = await hre.ethers.getContractFactory("CQPToken");
  // const cqpToken = await CQPToken.deploy(hre.ethers.utils.parseEther("1000"), hre.ethers.utils.parseEther("10000"));
  // await cqpToken.deployed();
  // console.log("CQPToken deployed to: ", cqpToken.address);

  const PriceFeedTracker = await hre.ethers.getContractFactory("PriceFeedTracker");
  console.log("Deploying PriceFeedTracker to ", network.name);
  const [account1] = await hre.ethers.getSigners();
  const pricefeedTracker = await hre.upgrades.deployProxy(
    PriceFeedTracker,[account1.address],{ initializer: "initialize" }
  );
  await pricefeedTracker.deployed();
  console.log("PriceFeedTracker deployed to:", pricefeedTracker.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
