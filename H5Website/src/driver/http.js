import actions from '../api'

export default {
  getCertification: (query) => actions.getCertification(query),
  getWinner: (query) => actions.getWinner(query)
}
