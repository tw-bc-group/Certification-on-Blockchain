require('minimist')(process.argv.slice(2));
require("truffle-hdwallet-provider");

module.exports = {
	networks: {
		local: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*'
		},
		quorum: {
			network_id: "*",
			host: "node1.quorum.cn.blockchain.thoughtworks.cn",
			port: 80,
			gasPrice: 0,
			gas: 450000000,
			type: "quorum"
		}
	}
};
