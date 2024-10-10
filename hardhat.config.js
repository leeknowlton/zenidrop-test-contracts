require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    baseSepolia: {
      url: `https://sepolia.base.org`, // Ensure this RPC URL is correct
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 84532,
      gasPrice: 1000000000,
    },
  },
};
