const Web3 = require('../3rd/web3.min.js')

const config = require('./config.js')

const search = query => {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'))
  
    const cac = new web3.eth.Contract(
        config.ABI, config.CONTRACT_ADDRESS)

    console.log('cac', cac)
    console.log('bytes', web3.utils.hexToBytes(web3.utils.asciiToHex("+86 123456789")))
    
    console.log(cac.methods.getCertification(web3.utils.hexToBytes(web3.utils.asciiToHex("+86 123456789"))))
    // console.log(cac.methods.getWinner(web3.utils.hexToBytes(web3.utils.asciiToHex("+86 123456789"))).call().then(console.log))
}

module.exports = {
  search: search
}