pragma solidity >=0.4.20;

contract CACCertificationContract {
    mapping(uint => Certification) public certificationMap;
    mapping(uint => Winner) public winnerMap;

    struct Winner {
        string firstName;
        string lastName;
        uint mobileNumber;
    }

    struct Certification {
        string certificationType;
        string subject;
        string awardDate;
        string expiredDate;
        string partner;
    }

    function issueCertification(string memory certificationType, string memory firstName, string memory lastName, uint mobileNumber, string memory subject, string memory awardDate, string memory expiredDate, string memory partner) public {
        certificationMap[mobileNumber] = Certification(certificationType, subject, awardDate, expiredDate, partner);
        winnerMap[mobileNumber] = Winner(firstName, lastName, mobileNumber);
    }

    function getCertification(uint mobileNumber) view public returns(string memory, string memory, string memory, string memory, string memory) {
        Certification storage cert = certificationMap[mobileNumber];
        return (cert.certificationType, cert.subject, cert.awardDate, cert.expiredDate, cert.partner);
    }

    function getWinner(uint mobileNumber) view public returns(string memory, string memory, uint) {
        Winner storage winner = winnerMap[mobileNumber];
        return (winner.firstName, winner.lastName, winner.mobileNumber);
    }
}