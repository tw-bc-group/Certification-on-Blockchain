<template>
  <div class="home">
    <h3>ThoughtWorks认证</h3>
    <router-link to="/search" tag="button" class="btn checker-btn">我是查询者</router-link>
    <button @click="issue" class="btn issuer-btn">我是颁发者</button>
  </div>
</template>

<style scoped lang="stylus">
  .home
    margin 20px
    h3
      margin-bottom 50px
    .btn
      margin-top 20px
      color white
      width 100%
      height 2em
      font-size 16px
      border-radius 3em
      box-sizing border-box
    .checker-btn
      background linear-gradient(to right, #F13235, #FA913D)
    .issuer-btn
      background linear-gradient(to right, #056EC2, #0ECDCA)
</style>

<script>
import abi from '../abi.json'
import {contractAddress} from '../constant'

export default {
  name: 'home',
  components: {},
  data () {
    return {
      searchInput: null
    }
  },
  methods: {
    issue() {
      if (typeof web3 === 'undefined') {
        alert('Cannot find Web3! Please install Metamask extension to issue certification!')
        return
      }

      var MyContract = web3.eth.contract(abi)
      var contract = MyContract.at(contractAddress)
      contract.isIssuer((e, isIssuer) => {
        if (e || !isIssuer) {
          alert('You are not issuer! Please contact contract owner if you need authorization!')
          return
        }
        this.$router.push({ name: 'issue' })
      })
    }
  }
}
</script>
