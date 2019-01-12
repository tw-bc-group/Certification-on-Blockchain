const app = getApp();
const bgImgWithOrangeBlue = require('../../image/bgImgWithOrangeBlue.js');
const aclogo = require('../../image/aclogo.js');

Page({
  data: {
    certification: {
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
    backgroundImage: bgImgWithOrangeBlue.url,
  },
  onLoad: function() {}
})