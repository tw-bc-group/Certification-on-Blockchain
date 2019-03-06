const argv = require('minimist')(process.argv.slice(2));
const HDWalletProvider = require("truffle-hdwallet-provider");
const infuraAccessToken = "fb032c29f8c94bf7aed00f42515ad21f";
const provider = `https://ropsten.infura.io/v3/${infuraAccessToken}`;

module.exports = {
	networks: {
		local: {
			host: '127.0.0.1',
			port: 8545,
			network_id: '*'
		},
		ropsten: {
			network_id: 3,
			provider: () => {
				if (typeof argv.mnemonic === "undefined") {
					throw new Error("Please provide mnemonic to deploy to ropsten!");
				}
				return new HDWalletProvider(argv.mnemonic, provider);
			}
		},
		production: {
			network_id: 3,
			gas: 4465030,
			provider: function() {
				var WalletProvider = require("truffle-wallet-provider");
				var keystore = require('fs').readFileSync('./keystore').toString();
				var pass = require('fs').readFileSync('./pass').toString();
				var wallet = require('ethereumjs-wallet').fromV3(keystore, pass);
				return new WalletProvider(wallet, "https://ropsten.infura.io/")
			}
		}
	}
};
