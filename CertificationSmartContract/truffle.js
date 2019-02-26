/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  	// See <http://truffleframework.com/docs/advanced/configuration>
  	// to customize your Truffle configuration!
	networks: {
		development: {
			host: '127.0.0.1',
			port: process.env.npm_package_config_dev_port,
			network_id: '*'
		},
		test: {
			host: '127.0.0.1',
			port: process.env.npm_package_config_test_port,
			network_id: '*'
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
