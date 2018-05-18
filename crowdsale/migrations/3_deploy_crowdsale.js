const CombisToken = artifacts.require("./CombisToken.sol");
const CombisCrowdsale = artifacts.require("./CombisCrowdsale.sol");

module.exports = function (deployer) {
    const wallet = web3.eth.accounts[0];

    return deployer
        .then(() => {
            return CombisToken.deployed();
        })
        .then(() => {
            return deployer.deploy(
                CombisCrowdsale,
                CombisToken.address, wallet);
        })
        .then(() => {
            return Promise.all([
                    CombisToken.deployed(),
                    CombisCrowdsale.deployed()
                ]
            );
        })
        .then((instances) => {
            const tokenInstance = instances[0];
            const crowdsaleInstance = instances[1];

            console.log('Transfering ownership of token to crowdsale contract');
            tokenInstance.transferOwnership(crowdsaleInstance.address);
        });
};
