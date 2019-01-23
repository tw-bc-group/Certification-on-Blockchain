const R = require('../3rd/ramda.min.js')
const bgImgTW = 'https://upload-images.jianshu.io/upload_images/217988-0557164f50a06676.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const bgImgCorporate = 'https://upload-images.jianshu.io/upload_images/217988-a37225109c8bc8cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const bgImgCommunity = 'https://upload-images.jianshu.io/upload_images/217988-366d97fd8575b9e6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const bgImgUniversity = 'https://upload-images.jianshu.io/upload_images/217988-55daa3d87ccb36c0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'

const genrate =
  R.cond([
    [
      R.equals('Corporate'), R.always(bgImgCorporate)
    ],
    [
      R.equals('Community'), R.always(bgImgCommunity)
    ],
    [
      R.equals('University'), R.always(bgImgUniversity)
    ],
    [
      R.T, R.always(bgImgTW)
    ],
  ])

module.exports = {
  genrate: genrate
}