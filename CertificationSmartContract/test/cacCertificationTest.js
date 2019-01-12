var CACCertificationContract = artifacts.require("./CACCertificationContract.sol");

contract('CACCertificationContract', function(accounts){
    it("should issue certification successfully", function(accounts){
        var cacCertification;
        var type = "TW";
        var firstName = "John";
        var lastName = "William";
        var mobileNumber = 123456;
        var subject = "agile coach";
        var awardDate = new Date(Date.now()).toLocaleDateString();
        var expiredDate = new Date("1/12/2020").toLocaleDateString();
        var partner = "Partner";

        return CACCertificationContract.new().then(function(instance){
            cacCertification = instance;
            return cacCertification.issueCertification(type, firstName, lastName, mobileNumber, subject, awardDate, expiredDate, partner);
        }).then(function(){
            return cacCertification.getCertification(mobileNumber);
        }).then(function(res){
            assert.equal(res.valueOf()[0], type);
            assert.equal(res.valueOf()[1], subject);
            assert.equal(res.valueOf()[2], awardDate);
            assert.equal(res.valueOf()[3], expiredDate);
            assert.equal(res.valueOf()[4], partner);
        }).then(function(){
            return cacCertification.getWinner(mobileNumber);
        }).then(function(res){
            assert.equal(res.valueOf()[0], firstName);
            assert.equal(res.valueOf()[1], lastName);
            assert.equal(res.valueOf()[2].valueOf(), mobileNumber);
        });
    });
});