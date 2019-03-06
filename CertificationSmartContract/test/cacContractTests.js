const CacContract = artifacts.require("CacContract");
const BN = web3.utils.BN;

contract("CacContract", accounts => {
    it("should issue certification", async () => {
        const instance = await CacContract.deployed();

        const subject = "Agile Coach";
        const firstName = "Zhe";
        const lastName = "Qu";
        const issueDate = Date.UTC(2019, 2, 1);
        const expireDate = Date.UTC(2021, 2, 1);
        const to = accounts[1]

        const tx = await instance.issue(subject, firstName, lastName, issueDate, expireDate, to);
        const tokenId = tx.logs[0].args.tokenId;

        const certification = await instance.certifications(tokenId);
        expect(certification.subject).to.equal(subject);
        expect(certification.firstName).to.equal(firstName);
        expect(certification.lastName).to.equal(lastName);
        expect(certification.issueDate.eq(new BN(issueDate))).to.be.true;
        expect(certification.expireDate.eq(new BN(expireDate))).to.be.true;
    });
});
