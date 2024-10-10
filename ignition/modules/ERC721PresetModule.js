const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const FactoryModule = require("./FactoryModule.js");

module.exports = buildModule("ERC721PresetModule", (m) => {
  console.log("Starting ERC721PresetModule");

  // Use the FactoryModule
  const factoryModule = m.useModule(FactoryModule);
  console.log("FactoryModule loaded:", factoryModule);

  if (!factoryModule || !factoryModule.factory) {
    console.error("FactoryModule details:", factoryModule);
    throw new Error("FactoryModule is not deployed or 'factory' is undefined.");
  }

  // Retrieve parameters
  const name = "MyArtCollection";
  const symbol = "MAC";
  const baseURI = "https://zenidrop.com/metadata/";

  console.log(
    `Creating ERC721Preset with Name: ${name}, Symbol: ${symbol}, BaseURI: ${baseURI}`
  );

  const result = m.call(factoryModule.factory, "createNFTContract", [
    name,
    symbol,
    baseURI,
  ]);

  console.log("ERC721Preset creation initiated");

  return { result };
});
