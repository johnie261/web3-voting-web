// require("@nomicfoundation/hardhat-toolbox");

// const PRIVATE_KEY = "e7cdcc8a8106f1b5f858635f26fb27b6e2cb54b7c8203afb0fc87dce74c29535";
// module.exports = {
//   defaultNetwork: "polygon_mumbai",
//   networks: {
//     hardhat: {
//       chainId: 80001,
//     },
//     polygon_mumbai: {
//       url: "https://rpc.ankr.com/polygon_mumbai",
//       accounts: [`0x${PRIVATE_KEY}`],
//     },
//   },
//   solidity: {
//     version: "0.8.9",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
// };

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/iS41JOH7X98Rbin9zAXH8BfK3l0Z-rMf',
      accounts: [
        'e7cdcc8a8106f1b5f858635f26fb27b6e2cb54b7c8203afb0fc87dce74c29535'
      ],
     }
  }
};