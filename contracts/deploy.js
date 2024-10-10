const { run, ethers } = require("hardhat");

async function main() {
  try {
    // Deploy all Ignition modules
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

    // Create a new ERC721Preset contract via the Factory
    const tx = await factory.createNFTContract(
      "MyArtCollection",
      "MAC",
      "https://zenidrop.com/metadata/"
    );

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("ERC721Preset contract creation transaction sent.");

    // Optionally, retrieve the latest deployed contract address
    const deployedContracts = await factory.getDeployedContracts();
    const latestAddress = deployedContracts[deployedContracts.length - 1];
    console.log("Latest ERC721Preset deployed at:", latestAddress);
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });
