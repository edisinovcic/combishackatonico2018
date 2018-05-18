const CombisToken = artifacts.require("./CombisToken.sol");
const CombisCrowdsale = artifacts.require("./CombisCrowdsale.sol");

function latestTime() {
    return web3.eth.getBlock('latest').timestamp;
}

const duration = {
    seconds: function (val) {
        return val
    },
    minutes: function (val) {
        return val * this.seconds(60)
    },
    hours: function (val) {
        return val * this.minutes(60)
    },
    days: function (val) {
        return val * this.hours(24)
    },
    weeks: function (val) {
        return val * this.days(7)
    },
    years: function (val) {
        return val * this.days(365)
    }
};

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
