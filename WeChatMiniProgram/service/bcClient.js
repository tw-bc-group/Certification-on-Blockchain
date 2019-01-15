const apiHost = 'http://139.219.2.9:3000'

const getCertification = query => {
  return new Promise((resolve, reject) => wx.request({
    url: apiHost + '/certifications/' + query,
    method: 'GET',
    success: (res) => resolve(res.data)
  }))
}

const getWinner = query => {
  return new Promise((resolve, reject) => wx.request({
    url: apiHost+ '/winners/' + query,
    method: 'GET',
    success: (res) => resolve(res.data)
  }))
}

module.exports = {
  getCertification: getCertification,
  getWinner: getWinner
}