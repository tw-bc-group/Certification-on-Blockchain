pragma solidity >=0.4.20;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";

contract CacContract is ERC721Full, MinterRole {
    mapping(uint256 => Certification) public certifications;

    struct Certification {
        string subject;
        string firstName;
        string lastName;
        // use uint64 to store date
        uint64 issueDate;
        uint64 expireDate;
        // use additional data to store certification type and partner
        string additionalData;
    }

    constructor () public ERC721Full("CAC", "CAC") {}

    function issue(
        string memory subject,
        string memory firstName,
        string memory lastName,
        uint64 issueDate,
        uint64 expireDate,
        string memory additionalData,
        address to
    ) public onlyMinter {
        uint256 tokenId = uint256(keccak256(abi.encodePacked(subject, firstName, lastName, uint256(issueDate))));
        _mint(to, tokenId);
        certifications[tokenId] = Certification(subject, firstName, lastName, issueDate, expireDate, additionalData);
    }
}
