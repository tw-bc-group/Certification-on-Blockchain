const CACCertificationContract = artifacts.require("CACCertificationContract");
const BN = web3.utils.BN;

contract("CACCertificationContract", accounts => {
    it("should set issuer", async () => {
        const instance = await CACCertificationContract.deployed();
        const previousCount = await instance.countIssuers();

        await instance.setIssuer(accounts[0]);

        const count = await instance.countIssuers();
        assert.isTrue(count.eq(previousCount.add(new BN(1))));
        assert.equal(await instance.issuers(count - 1), accounts[0]);
    });

    it("should not set issuer if sender is not contract owner", async () => {
        const instance = await CACCertificationContract.deployed();
        const previousCount = await instance.countIssuers();

        try {
            await instance.setIssuer(accounts[1], {from: accounts[1]});
        } catch {
        } finally {
            const count = await instance.countIssuers();
            assert.isTrue(count.eq(previousCount));
        }
    });
});
