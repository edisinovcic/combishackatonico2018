require('babel-register');
require('babel-polyfill');

module.exports = {
    mocha: {
        useColors: true
    },

    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },

    networks: {
        development: {
            host: '127.0.0.1',
            port: 9545,
            network_id: '*' // Match any network id
        },
        demo: {
            host: '127.0.0.1',
            port: '9545',
            network_id: '*' // Match any network id
        }
    }
};
