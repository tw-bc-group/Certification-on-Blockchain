pragma solidity >=0.4.20;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract CacContract is ERC721Full {
    mapping(uint256 => Certification) public certifications;

    struct Certification {
        string subject;
        string firstName;
        string lastName;
        uint64 issueDate;
        uint64 expireDate;
    }

    constructor () public ERC721Full("CAC", "CAC") {}

    function issue(
        string memory subject,
        string memory firstName,
        string memory lastName,
        uint64 issueDate,
        uint64 expireDate,
        address to
    ) public {
        uint256 tokenId = uint256(keccak256(abi.encodePacked(subject, firstName, lastName, issueDate)));
        _mint(to, tokenId);
        certifications[tokenId] = Certification(subject, firstName, lastName, issueDate, expireDate);
    }
}
