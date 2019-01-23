const R = require('../3rd/ramda.min.js')
const logo = 'https://upload-images.jianshu.io/upload_images/217988-4ad6312df612c4aa.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const logoCorporate = 'https://upload-images.jianshu.io/upload_images/217988-3a9c600958ee2a3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const logoCommunity = 'https://upload-images.jianshu.io/upload_images/217988-257c5c5dceba99cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const logoUniversity = 'https://upload-images.jianshu.io/upload_images/217988-8a96182cc6ff1c1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const huaweiLogo = 'https://upload-images.jianshu.io/upload_images/217988-3275b8cee2460485.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const communityLogo = 'https://upload-images.jianshu.io/upload_images/217988-0b8833beab1ade51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const universityLogo = 'https://upload-images.jianshu.io/upload_images/217988-279c9e609bf72693.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'

const partnerLogo = R.cond([
  [
    R.equals('Huawei'), R.always(huaweiLogo)
  ],
  [
    R.equals('Github'), R.always(communityLogo)
  ],
  [
    R.equals('BeiJingUniversity'), R.always(universityLogo)
  ],
  [
    R.T, R.always([])
  ]])


const genrate = (type, partner) => {
  return R.cond([
    [
      R.equals('Corporate'), R.always([logoCorporate, partnerLogo(partner)])
    ],
    [
      R.equals('Community'), R.always([logoCommunity, partnerLogo(partner)])
    ],
    [
      R.equals('University'), R.always([logoUniversity, partnerLogo(partner)])
    ],
    [
      R.T, R.always([logo])
    ],
  ])(type)
}

module.exports = {
  genrate: genrate
}