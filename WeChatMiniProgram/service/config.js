module.exports = {
  CONTRACT_ADDRESS: '0x6ac9917cef1349393bb682eec62e514e6a018ee1',
  ABI: [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "winnerMap",
      "outputs": [
        {
          "name": "firstName",
          "type": "string"
        },
        {
          "name": "lastName",
          "type": "string"
        },
        {
          "name": "mobileNumber",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "certificationMap",
      "outputs": [
        {
          "name": "certificationType",
          "type": "string"
        },
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "awardDate",
          "type": "string"
        },
        {
          "name": "expiredDate",
          "type": "string"
        },
        {
          "name": "partner",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "certificationType",
          "type": "string"
        },
        {
          "name": "firstName",
          "type": "string"
        },
        {
          "name": "lastName",
          "type": "string"
        },
        {
          "name": "mobileNumber",
          "type": "bytes32"
        },
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "awardDate",
          "type": "string"
        },
        {
          "name": "expiredDate",
          "type": "string"
        },
        {
          "name": "partner",
          "type": "string"
        }
      ],
      "name": "issueCertification",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "mobileNumber",
          "type": "bytes32"
        }
      ],
      "name": "getCertification",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "mobileNumber",
          "type": "bytes32"
        }
      ],
      "name": "getWinner",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
}