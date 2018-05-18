const CombisToken = artifacts.require("./CombisToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CombisToken);
};
