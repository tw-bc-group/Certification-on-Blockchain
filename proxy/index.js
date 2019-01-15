const express = require("express")
const axios = require("axios")
const Web3 = require("web3")
const app = express()
const port = 3000

app.get('/winners/:mobileNumber', (req, res) => getWinner(req.params.mobileNumber).then(r => res.send(r)))
app.get('/certifications/:mobileNumber', (req, res) => getCertification(req.params.mobileNumber).then(r => res.send(r)))

app.listen(port, () => console.log(`the twcac proxy app listening on port ${port}!`))

const web3 = new Web3()

const conf = {
    network: "https://api-ropsten.etherscan.io/",
    contractAddress: "0x6aC9917cef1349393Bb682EEC62E514E6a018Ee1",
    API_KEY: "UK1C9AYRMU7BG3ZA2F87MZZ4P3F84VKEXG"
}

const target = axios.create({
    baseURL: conf.network,
    params: {
        module: "proxy",
        action: "eth_call",
        to: conf.contractAddress,
        apikey: conf.API_KEY
    },
    timeout: 1000
})


function getWinner(mobileNumber) {
    return target.get("/api", { params: { data: encodingFunc("getWinner", mobileNumber)} })
        .then(res => {
            const result = web3.eth.abi.decodeParameters([
                {"name": "firstName", "type": "string"}, 
                {"name": "lastName", "type": "string"}, 
                {"name": "mobileNumber", "type": "bytes32"}], res.data.result)

            return { 
                firstName: result.firstName, 
                lastName: result.lastName, 
                mobileNumber: result.mobileNumber
            }
        }
    ).catch(console.err)
}

function getCertification(mobileNumber) {
    return target.get("/api", {
        params: {
            data: encodingFunc("getCertification", mobileNumber)
        }
    }).then(res => {
        const result = web3.eth.abi.decodeParameters([
            {"name": "certificationType", "type": "string"}, 
            {"name": "subject", "type": "string"}, 
            {"name": "awardDate", "type": "string"}, 
            {"name": "expiredDate", "type": "string"}, 
            {"name": "partner", "type": "string"}], 
            res.data.result)

        return {
            certificationType: result.certificationType, 
            subject: result.subject, 
            awardDate: result.awardDate, 
            expiredDate: result.expiredDate, 
            partner: result.partner
        } 
    }).catch(console.err)

}

function encodingFunc(funcName, mobileNumber) {
    return web3.eth.abi.encodeFunctionCall(
        {
            "name": funcName, 
            "type": "function",
            "inputs": [{"name": "mobileNumber", "type": "bytes32"}]
        }, [web3.utils.toHex(mobileNumber)])
}
