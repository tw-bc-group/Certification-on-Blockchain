pragma solidity >=0.4.20;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CACCertificationContract is Ownable {

    address[] public issuers;

    mapping(bytes32 => Certification) public certificationMap;
    mapping(bytes32 => Winner) public winnerMap;

    struct Winner {
        string firstName;
        string lastName;
        bytes32 mobileNumber;
    }

    struct Certification {
        string certificationType;
        string subject;
        string awardDate;
        string expiredDate;
        string partner;
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

    function issueCertification(string memory certificationType, string memory firstName, string memory lastName, bytes32 mobileNumber, string memory subject, string memory awardDate, string memory expiredDate, string memory partner) public {
        certificationMap[mobileNumber] = Certification(certificationType, subject, awardDate, expiredDate, partner);
        winnerMap[mobileNumber] = Winner(firstName, lastName, mobileNumber);
    }

    function getCertification(bytes32 mobileNumber) view public returns(string memory, string memory, string memory, string memory, string memory) {
        Certification storage cert = certificationMap[mobileNumber];
        return (cert.certificationType, cert.subject, cert.awardDate, cert.expiredDate, cert.partner);
    }

    function getWinner(bytes32 mobileNumber) view public returns(string memory, string memory, bytes32) {
        Winner storage winner = winnerMap[mobileNumber];
        return (winner.firstName, winner.lastName, bytes32(winner.mobileNumber));
    }
}