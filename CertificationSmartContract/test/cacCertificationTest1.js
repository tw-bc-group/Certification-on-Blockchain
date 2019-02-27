const CACCertificationContract = artifacts.require("CACCertificationContract");

contract("CACCertificationContract", accounts => {
    it("should set issuer", async () => {
        const instance = await CACCertificationContract.deployed();

        await instance.setIssuer(accounts[0]);

        assert.isTrue(await instance.isIssuer({from: accounts[0]}));
    });

    it("should not set issuer if sender is not contract owner", async () => {
        const instance = await CACCertificationContract.deployed();
        try {
            await instance.setIssuer(accounts[1], {from: accounts[1]});
        } catch {
        } finally {
            assert.isFalse(await instance.isIssuer({from: accounts[1]}));
        }
    });
});
