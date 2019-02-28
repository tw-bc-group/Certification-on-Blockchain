const { getWeb3, getContractInstance } = require("./helper")
const web3 = getWeb3()
const getInstance = getContractInstance(web3)

var CACCertificationContract = artifacts.require("./CACCertificationContract.sol");

contract('CACCertificationContract', (accounts) => {
    it("should issue certification successfully", async () => {
        var type = "TW";
        var firstName = "John";
        var lastName = "William";
        var hashedIdCardNumberString = "0xcb7c81f49b8692e22533402b1926f59304e1e4c89eea454b8cf4d464d5aaaaf2"; // 110101199001011111 hashed by sha256
        var hashedIdCardNumber = web3.utils.hexToBytes(hashedIdCardNumberString);
        var subject = "agile coach";
        var awardDate = new Date(Date.now()).toLocaleDateString();
        var expiredDate = new Date("1/12/2020").toLocaleDateString();
        var partner = "Partner";
        var issuer = "0x3ef7dc97b9680e204f59143eec341af666193d3a";

        const cacCertification = getInstance("CACCertificationContract")
        await cacCertification.methods.issueCertification(type, firstName, lastName, hashedIdCardNumber, subject, awardDate, expiredDate, partner, issuer).send({ from: accounts[0], gas: 1000000 });
        const res = await cacCertification.methods.getCertification(hashedIdCardNumber).call();
        assert.equal(res.valueOf()[0], type);
        assert.equal(res.valueOf()[1], subject);
        assert.equal(res.valueOf()[2], awardDate);
        assert.equal(res.valueOf()[3], expiredDate);
        assert.equal(res.valueOf()[4], partner);

        const winner = await cacCertification.methods.getWinner(hashedIdCardNumber).call();
        assert.equal(winner.valueOf()[0], firstName);
        assert.equal(winner.valueOf()[1], lastName);
        assert.equal(winner.valueOf()[2].valueOf(), hashedIdCardNumberString);
    });
});