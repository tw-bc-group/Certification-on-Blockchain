<template>
  <div class="issue">
    <h3>颁发证书</h3>
    <input type="text" class="half-text-input" placeholder="姓：" v-model="lastName">
    <span class="half-text-input-separator" />
    <input type="text" class="half-text-input" placeholder="名：" v-model="firstName">
    <input type="text" class="text-input" placeholder="请输入身份证号：" v-model="idCardNumber">
    <select class="dropdown" v-model="certificationType">
      <option value="">请选择证书类型</option>
      <option value="corporate">Corporate</option>
      <option value="university">University</option>
      <option value="community">Community</option>
      <option value="tw">TW</option>
    </select>
    <input type="text" class="text-input" placeholder="请输入主题：" v-model="subject">
    <input type="date" class="text-input date-input" placeholder="获得时间：" v-model="awardDate">
    <input type="date" class="text-input date-input" placeholder="过期时间：" v-model="expiredDate">
    <input type="text" class="text-input" placeholder="请输入颁发证书组织：" v-model="partner" v-if="certificationType != 'tw'">
    <input type="text" class="text-input" placeholder="请输入证书颁发者：" v-model="issuer">
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
export default {
  name: 'issue',
  components: {},
  data () {
    return {
      firstName: '',
      lastName: '',
      idCardNumber: '',
      certificationType: '',
      subject: '',
      awardDate: '',
      expiredDate: '',
      partner: '',
      issuer: ''
    }
  },
  methods: {
    clickHandler () {
      if (this.searchInput === null) return
      const query = JSON.stringify(this.searchInput)
      this.$router.push({ name: 'certification', query: { query } })
    }
  }
}
</script>
