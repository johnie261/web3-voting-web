//const hre = require("hardhat");

// async function main() {

//   const lock = await hre.ethers.deployContract("Lock");

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const create = await ethers.deployContract("Create");

  console.log("Create address:", await create.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// const hre = require("hardhat");

// async function main() {

//   const Create = await hre.ethers.getContractFactory("Create");
//   const create = await Create.deploy();

//   await create.deployed()

//   console.log("Create address:", create.address);
// }

// main().catch((error) => {
//   console.log(error);
//   process.exitCode = 1;
// })