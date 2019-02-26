const CACCertificationContract = artifacts.require("CACCertificationContract");

contract("CACCertificationContract", accounts => {
    it("should set issuer", async () => {
        const instance = await CACCertificationContract.deployed();
        const previousCount = await instance.countIssuers();

        await instance.setIssuer(accounts[0]);

        const count = await instance.countIssuers();
        assert.equal(count - previousCount, 1);
        assert.equal(await instance.issuers(count - 1), accounts[0]);
    });
});
