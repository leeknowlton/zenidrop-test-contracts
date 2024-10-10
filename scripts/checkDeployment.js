const hre = require("hardhat");

async function main() {
  const factoryAddress = "DEPLOYED_FACTORY_ADDRESS"; // Replace with your actual deployed address

  console.log("Checking NFTFactory deployment...");
  const Factory = await hre.ethers.getContractFactory("NFTFactory");
  const factory = await Factory.attach(factoryAddress);

  console.log("NFTFactory functions:");
  console.log(Object.keys(factory.interface.functions));

  console.log("\nGetting deployed ERC721Preset contracts...");
  const deployedContracts = await factory.getDeployedContracts();
  console.log("Deployed contracts:", deployedContracts);

  if (deployedContracts.length > 0) {
    const latestERC721Address = deployedContracts[deployedContracts.length - 1];
    console.log("\nChecking latest ERC721Preset deployment...");
    const ERC721Preset = await hre.ethers.getContractFactory("ERC721Preset");
    const preset = await ERC721Preset.attach(latestERC721Address);

    console.log("ERC721Preset functions:");
    console.log(Object.keys(preset.interface.functions));
  } else {
    console.log("No ERC721Preset contracts deployed yet.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
