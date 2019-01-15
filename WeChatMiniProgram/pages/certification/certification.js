const app = getApp()
const bgGenerator = require('../../pipe/bgGenerator.js')
const logoGenerator = require('../../pipe/logoGenerator.js')
const bcClient = require('../../service/bcClient.js')

Page({
  data: {
    certification: {
      type: '',
      winner: {
        firstName: '',
        lastName: '',
        mobileNumber: ''
      },
      subject: '',
      awardDate: '',
      expiredDate: '',
      partner: ''
    },
    hashCode: '',
  },
  onLoad: function (options) {
    const result = bcClient.search(options.query)
    this.setData(
     {
        'certification.winner': result.winner,
        'certification.type': result.certificationType,
        'certification.subject': result.subject,
        'certification.awardDate': result.awardDate,
        'certification.expiredDate': result.expiredDate,
        'certification.partner': result.partner,
        hashCode: result.winner.mobileNumber.substring(0, 19),
        backgroundImage: bgGenerator.genrate(result.certificationType),
        logos: logoGenerator.genrate(result.certificationType, result.partner)
     }
    )
  }
})