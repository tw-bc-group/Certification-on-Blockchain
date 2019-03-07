<template>
  <div class="issue">
    <h3>颁发证书</h3>
    <input type="text" class="text-input" placeholder="请输入主题：" v-model="subject">
    <input type="text" class="half-text-input" placeholder="姓：" v-model="lastName">
    <span class="half-text-input-separator" />
    <input type="text" class="half-text-input" placeholder="名：" v-model="firstName">
    <input type="date" class="text-input date-input" placeholder="获得时间：" v-model="issueDate">
    <input type="date" class="text-input date-input" placeholder="过期时间：" v-model="expireDate">
    <select class="dropdown" v-model="additionalData.type">
      <option value="">请选择证书类型</option>
      <option value="Corporate">Corporate</option>
      <option value="University">University</option>
      <option value="Community">Community</option>
      <option value="TW">TW</option>
    </select>
    <input type="text" class="text-input" placeholder="请输入颁发证书组织：" v-model="additionalData.partner" v-if="additionalData.type != 'tw'">
    <input type="text" class="text-input" placeholder="获得者钱包地址：" v-model="to">
    <button @click="clickHandler" class="confirm-btn">颁发证书</button>
  </div>
</template>

<style scoped lang="stylus">
  .issue
    margin 20px
    .half-text-input
      width 45%
      height 4em
      box-sizing border-box
      border-radius 0
      border-bottom 1px solid darkgrey
    .half-text-input-separator
      margin-right: 10%
    .text-input
      width 100%
      height 4em
      border-radius 0
      border-bottom 1px solid darkgrey
    .date-input:before
      content attr(placeholder) !important
      color #aaa
      margin-right 0.5em
    .dropdown
      width 100%
      height 4em
      border-radius 0
      border-bottom 1px solid darkgrey
      background-color transparent
    .confirm-btn
      margin-top 20px
      color white
      width 100%
      height 2em
      font-size 16px
      border-radius 3em
      box-sizing border-box
      background linear-gradient(to right, #056EC2, #0ECDCA)
</style>

<script>
import { retrieveContract, retrieveWeb3, walletAddress } from '../web3Provider'

export default {
  name: 'issue',
  data () {
    return {
      subject: '',
      firstName: '',
      lastName: '',
      issueDate: '',
      expireDate: '',
      additionalData: {
        type: '',
        partner: ''
      },
      to: ''
    }
  },
  methods: {
    async clickHandler () {
      const contract = retrieveContract()
      const address = walletAddress()
      const web3 = retrieveWeb3()

      const tx = await contract.methods.issue(
        this.subject,
        this.firstName,
        this.lastName,
        Date.parse(this.issueDate),
        Date.parse(this.expireDate),
        JSON.stringify(this.additionalData),
        this.to
      ).send({ from: address })

      const tokenId = tx.events.Transfer.returnValues.tokenId
      this.$router.push({
        name: 'certification',
        params: { id: web3.utils.numberToHex(tokenId) }
      })
    }
  }
}
</script>
