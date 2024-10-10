const { ethers, run } = require("hardhat");

async function main() {
  try {
    // Initialize Ignition (if not already initialized)
    await run("ignition:deploy");

    // Retrieve the deployed Factory module
    const factoryModule = await ethers.getContract("FactoryModule");

    // Ensure the factory exists
    if (!factoryModule.factory) {
      throw new Error("Factory instance is undefined in FactoryModule.");
    }

    const factoryAddress = factoryModule.factory;
    console.log("NFTFactory deployed at:", factoryAddress);

    // Get the Factory contract instance
    const factory = await ethers.getContractAt("NFTFactory", factoryAddress);

    // Retrieve all deployed ERC721Preset contract addresses
    const deployedContracts = await factory.getDeployedContracts();

    if (deployedContracts.length === 0) {
      console.log("No ERC721Preset contracts have been deployed yet.");
      return;
    }

    console.log("Deployed ERC721Preset Contracts:");
    deployedContracts.forEach((address, index) => {
      console.log(`${index + 1}: ${address}`);
    });
  } catch (error) {
    console.error("Error retrieving deployed contracts:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });
