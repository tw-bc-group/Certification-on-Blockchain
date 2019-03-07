const CacContract = artifacts.require('CacContract');

module.exports = function (deployer) {
    deployer.deploy(CacContract);
};
