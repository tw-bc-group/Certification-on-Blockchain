const app = getApp()
const bgGenerator = require('../../pipe/bgGenerator.js')
const logoGenerator = require('../../pipe/logoGenerator.js')
const hashCodeGenerator = require('../../pipe/hashCodeGenerator.js')
const bcClient = require('../../service/bcClient.js')

Page({
  data: {
    certification: {
      certificationType: '',
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
  onLoad: function(options) {
    const { getCertification, getWinner} = bcClient
    const { query } = options
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([getCertification(query), getWinner(query)]).then((res) => {
      this.setData({
        certification: res[0],
        'certification.winner': res[1],
        hashCode: hashCodeGenerator.genrate(res[1].mobileNumber),
        backgroundImage: bgGenerator.genrate(res[0].certificationType),
        logos: logoGenerator.genrate(res[0].certificationType, res[0].partner)
      })
      wx.hideLoading()
    })
  }
})