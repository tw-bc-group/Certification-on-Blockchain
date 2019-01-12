const app = getApp()
const bgGenerator = require('../../pipe/bgGenerator.js')
const aclogo = require('../../image/aclogo.js')

Page({
  data: {
    certification: {
      type: 'TW',
      winner: {
        firstName: 'John',
        lastName: 'William'
      },
      subject: 'agile coach',
      awardDate: '3rd Jan 2019',
      expiredDate: '3rd Jan 2021',
      primaryIssuer: 'ThoughtWorks',
      secondaryIssuers: ['TAL Apparel']
    },
    hashCode: '0x5c47e30dc7f82167de',
    logo: aclogo.url,
  },
  onLoad: function() {
    this.setData(
     {
        backgroundImage: bgGenerator.genrate(this.data.certification.type)
     }
    )
  }
})