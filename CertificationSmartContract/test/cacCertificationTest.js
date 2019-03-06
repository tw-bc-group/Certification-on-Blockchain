const { getWeb3 } = require("./helper")
const web3 = getWeb3()

var CACCertificationContract = artifacts.require("./CACCertificationContract.sol");

contract('CACCertificationContract', (accounts) => {
    it.skip("should issue certification successfully given the sender is a issuer", async () => {
        const instance = await CACCertificationContract.new();

        await instance.setIssuer(accounts[0]);

        var type = "tw";
        var firstName = "John";
        var lastName = "William";
        var hashedIdCardNumberString = "0xcb7c81f49b8692e22533402b1926f59304e1e4c89eea454b8cf4d464d5aaaaf2"; // 110101199001011111 hashed by sha256
        var hashedIdCardNumber = web3.utils.hexToBytes(hashedIdCardNumberString);
        var subject = "agile coach";
        var awardDate = "2019-02-28"
        var expiredDate = "2021-02-28"
        var partner = "partner";

        await instance.issueCertification(type, firstName, lastName, hashedIdCardNumber, subject, awardDate, expiredDate, partner, { from: accounts[0], gas: 1000000 });
        const res = await instance.getCertification(hashedIdCardNumber);
        assert.equal(res.valueOf()[0], type);
        assert.equal(res.valueOf()[1], subject);
        assert.equal(res.valueOf()[2], awardDate);
        assert.equal(res.valueOf()[3], expiredDate);
        assert.equal(res.valueOf()[4], partner);

        const winner = await instance.getWinner(hashedIdCardNumber);
        assert.equal(winner.valueOf()[0], firstName);
        assert.equal(winner.valueOf()[1], lastName);
        assert.equal(winner.valueOf()[2].valueOf(), hashedIdCardNumberString);
    });

    it.skip("should throw error given the sender is not a issuer", async () => {
        const instance = await CACCertificationContract.new();
        
        var type = "tw";
        var firstName = "John";
        var lastName = "William";
        var hashedIdCardNumberString = "0xcb7c81f49b8692e22533402b1926f59304e1e4c89eea454b8cf4d464d5aaaaf2"; // 110101199001011111 hashed by sha256
        var hashedIdCardNumber = web3.utils.hexToBytes(hashedIdCardNumberString);
        var subject = "agile coach";
        var awardDate = "2019-02-28"
        var expiredDate = "2021-02-28"
        var partner = "partner";

        try {
            await instance.issueCertification(type, firstName, lastName, hashedIdCardNumber, subject, awardDate, expiredDate, partner, { from: accounts[0], gas: 1000000 });
        } catch (error) {
            assert.equal(error.reason, "Issuer Not Found");
        }
    });
});