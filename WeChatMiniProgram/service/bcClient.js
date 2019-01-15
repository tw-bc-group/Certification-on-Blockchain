const Web3 = require('../3rd/web3.min.js')

const config = require('./config.js')

var certification = {
    certificationType: "",
    subject: "",
    winner: {
        firstName: "",
        lastName: "",
        mobileNumber: ""
    },
    awardDate: "",
    expiredDate: "",
    partner: ""
}

const search = query => {
    
    wx.request({
        url: 'http://139.219.2.9:3000/certifications/'+query,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        success: function (res) {
            certification.certificationType = res.data.certificationType
            certification.subject = res.data.subject
            certification.awardDate = res.data.awardDate
            certification.expiredDate = res.data.expiredDate
            certification.partner = res.data.partner
        }
    })

    wx.request({
        url: 'http://139.219.2.9:3000/winners/' + query,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        success: function (res) {
            certification.winner.firstName = res.data.firstName
            certification.winner.lastName = res.data.lastName
            certification.winner.mobileNumber = res.data.mobileNumber
        }
    })

    return certification
}

module.exports = {
  search: search
}