const { getWeb3, getContractInstance } = require("./helper")
const web3 = getWeb3()
const getInstance = getContractInstance(web3)

var CACCertificationContract = artifacts.require("./CACCertificationContract.sol");

contract('CACCertificationContract', (accounts) => {
    it("should issue certification successfully", async () => {
        var type = "TW";
        var firstName = "John";
        var lastName = "William";
        var mobileNumber = web3.utils.hexToBytes(web3.utils.asciiToHex("+86 123456789"));
        var subject = "agile coach";
        var awardDate = new Date(Date.now()).toLocaleDateString();
        var expiredDate = new Date("1/12/2020").toLocaleDateString();
        var partner = "Partner";

        const cacCertification = getInstance("CACCertificationContract")
        await cacCertification.methods.issueCertification(type, firstName, lastName, mobileNumber, subject, awardDate, expiredDate, partner).send({ from: accounts[0] });
        const res = await cacCertification.methods.getCertification(mobileNumber).call();
        assert.equal(res.valueOf()[0], type);
        assert.equal(res.valueOf()[1], subject);
        assert.equal(res.valueOf()[2], awardDate);
        assert.equal(res.valueOf()[3], expiredDate);
        assert.equal(res.valueOf()[4], partner);

        const winner = cacCertification.methods.getWinner(mobileNumber).call();
        assert.equal(winner.valueOf()[0], firstName);
        assert.equal(winner.valueOf()[1], lastName);
        assert.equal(web3.utils.hexToUtf8(winner.valueOf()[2].valueOf()), "+86 123456789");
    });
});