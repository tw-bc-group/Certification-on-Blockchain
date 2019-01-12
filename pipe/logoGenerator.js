const R = require('../3rd/ramda.min.js')
const logo = require('../image/logo.js')
const logoCorporate = require('../image/logoCorporate.js')
const huaweiLogo = require('../image/huaweiLogo.js')

const partnerLogo = R.cond([
  [
    R.equals('Huawei'), R.always(huaweiLogo)
  ],
  [
    R.equals('Github'), R.always(huaweiLogo)
  ],
  [
    R.equals('BeiJingUniversity'), R.always(huaweiLogo)
  ],
  [
    R.T, R.always([])
  ]])


const genrate = (type, partner) => {
  return R.compose(
    R.pluck('url'),
    R.cond([
      [
        R.equals('Corporate'), R.always([logoCorporate, partnerLogo(partner)])
      ],
      [
        R.equals('Community'), R.always([logoCorporate, partnerLogo(partner)])
      ],
      [
        R.equals('University'), R.always([logoCorporate, partnerLogo(partner)])
      ],
      [
        R.T, R.always([logo])
      ],
    ])
  )(type)
}

module.exports = {
  genrate: genrate
}