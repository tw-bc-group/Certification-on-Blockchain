import axios from 'axios'

const rootUrl = 'https://cac.thoughtworks.cn:3000'

const actions = {
  getCertification: (query) => axios.get(
    `${rootUrl}/certifications/"${query}"`),

  getWinner: (query) => axios.get(
    `${rootUrl}/winners/"${query}"`)
}

export default actions
