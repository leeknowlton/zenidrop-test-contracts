const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FactoryModule", (m) => {
  const factory = m.contract("NFTFactory");
  console.log("Deploying NFTFactory:", factory);
  return { factory };
});
