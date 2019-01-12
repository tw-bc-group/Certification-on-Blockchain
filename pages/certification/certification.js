const app = getApp()
const bgGenerator = require('../../pipe/bgGenerator.js')
const logoGenerator = require('../../pipe/logoGenerator.js')

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
      partner: 'Huawei'
    },
    hashCode: '0x5c47e30dc7f82167de',
  },
  onLoad: function() {
    const { certification } = this.data
    this.setData(
     {
        backgroundImage: bgGenerator.genrate(certification.type),
        logos: logoGenerator.genrate(certification.type, certification.partner)
     }
    )
  }
})