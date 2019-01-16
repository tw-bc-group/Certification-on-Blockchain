const R = require('../3rd/ramda.min.js')
const bgImgTW = require('../image/bgImgTW.js')
const bgImgCorporate = require('../image/bgImgCorporate.js')
const bgImgCommunity = require('../image/bgImgCommunity.js')
const bgImgUniversity = require('../image/bgImgUniversity.js')

const genrate =
R.compose(
    R.prop('url'),
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
  )

module.exports = {
  genrate: genrate
}