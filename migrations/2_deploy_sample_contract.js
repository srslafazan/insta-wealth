const SampleContract = artifacts.require("./SampleContract");

module.exports = async (deployer, network) => {
  if (network !== 'development') return;
  deployer.deploy(SampleContract)
};
