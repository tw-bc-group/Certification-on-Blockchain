const CACCertification = artifacts.require('CACCertificationContract');

module.exports = function (deployer) {
    deployer.deploy(CACCertification);
}