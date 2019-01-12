const R = require('../3rd/ramda.min.js')
const bgImgTW = require('../image/bgImgTW.js')
const bgImgCorporate = require('../image/bgImgCorporate.js')

const genrate =
R.compose(
    R.prop('url'),
    R.cond([
      [
        R.equals('Corporate'), R.always(bgImgCorporate)
      ],
      [
        R.equals('Community'), R.always(bgImgCorporate)
      ],
      [
        R.equals('University'), R.always(bgImgCorporate)
      ],
      [
        R.T, R.always(bgImgTW)
      ],
    ])
  )

module.exports = {
  genrate: genrate
}