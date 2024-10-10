const { run, ethers } = require("hardhat");

async function main() {
  try {
    // Deploy FactoryModule
    await run("ignition:deploy", {
      modulePath: "ignition/modules/FactoryModule.js",
      network: "baseSepolia",
    });

    // Get the deployed factory address
    const deployedAddresses = require("../ignition/deployments/baseSepolia/deployed_addresses.json");
    const factoryAddress = deployedAddresses["FactoryModule#NFTFactory"];

    console.log("NFTFactory deployed at:", factoryAddress);

    // Deploy ERC721PresetModule
    await run("ignition:deploy", {
      modulePath: "ignition/modules/ERC721PresetModule.js",
      network: "baseSepolia",
    });

    console.log("ERC721Preset deployment completed.");
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
