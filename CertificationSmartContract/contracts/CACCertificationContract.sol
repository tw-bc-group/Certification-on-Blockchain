pragma solidity >=0.4.20;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CACCertificationContract is Ownable {

    address[] public issuers;

    mapping(bytes32 => Certification) public certificationMap;
    mapping(bytes32 => Winner) public winnerMap;

    struct Winner {
        string firstName;
        string lastName;
        bytes32 hashedIdCardNumber;
    }

    struct Certification {
        string certificationType;
        string subject;
        string awardDate;
        string expiredDate;
        string partner;
        address issuer;
    }

    function setIssuer(address issuer) public onlyOwner {
        issuers.push(issuer);
    }

    function isIssuer() public view returns(bool result) {
        for (uint i = 0; i < issuers.length; i++) {
            if (issuers[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function issueCertification(string memory certificationType, string memory firstName, string memory lastName, bytes32 hashedIdCardNumber, string memory subject, string memory awardDate, string memory expiredDate, string memory partner) public {
        require(isIssuer(), "Issuer Not Found");
        certificationMap[hashedIdCardNumber] = Certification(certificationType, subject, awardDate, expiredDate, partner, msg.sender);
        winnerMap[hashedIdCardNumber] = Winner(firstName, lastName, hashedIdCardNumber);
    }

    function getCertification(bytes32 hashedIdCardNumber) view public returns(string memory, string memory, string memory, string memory, string memory) {
        Certification storage cert = certificationMap[hashedIdCardNumber];
        return (cert.certificationType, cert.subject, cert.awardDate, cert.expiredDate, cert.partner);
    }

    function getWinner(bytes32 hashedIdCardNumber) view public returns(string memory, string memory, bytes32) {
        Winner storage winner = winnerMap[hashedIdCardNumber];
        return (winner.firstName, winner.lastName, bytes32(winner.hashedIdCardNumber));
    }
}