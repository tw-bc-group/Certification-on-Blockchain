<template>
  <div>
    <section class="search">
      <input type="text" class="text-input" placeholder="请输入证书编号：" v-model="id">
      <button @click="searchId" class="search-btn search-id">查询</button>
    </section>
    <section class="search">
      <input type="text" class="half-text-input" placeholder="姓：" v-model="lastName">
      <span class="half-text-input-separator" />
      <input type="text" class="half-text-input" placeholder="名：" v-model="firstName">
      <input type="text" class="text-input" placeholder="请输入主题：" v-model="subject">
      <input type="date" class="text-input date-input" placeholder="获得时间：" v-model="issueDate">
      <button @click="searchName" class="search-btn search-name">查询</button>
    </section>
  </div>
</template>

<style scoped lang="stylus">
  .search
    margin 20px
    .text-input
      width 100%
      height 4em
      border-radius 0
      border-bottom 1px solid darkgrey
    .half-text-input
      width 45%
      height 4em
      box-sizing border-box
      border-radius 0
      border-bottom 1px solid darkgrey
    .half-text-input-separator
      margin-right: 10%
    .date-input:before
      content attr(placeholder) !important
      color #aaa
      margin-right 0.5em
    .search-btn
      margin-top 20px
      color white
      width 100%
      height 2em
      font-size 16px
      border-radius 3em
      box-sizing border-box
      &.search-id
        background linear-gradient(to right, #F13235, #FA913D)
      &.search-name
        background linear-gradient(to right, #056EC2, #0ECDCA)
</style>

<script>
import { retrieveWeb3 } from '../web3Provider'

export default {
  name: 'search',
  data () {
    return {
      id: null,
      firstName: null,
      lastName: null,
      subject: null,
      issueDate: null
    }
  },
  methods: {
    searchId () {
      if (this.id === null) {
        return
      }
      this.$router.push({ name: 'certification', params: { id: this.id } })
    },
    searchName () {
      if (this.firstName == null || this.lastName == null || this.subject == null || this.issueDate == null) {
        return
      }
      const web3 = retrieveWeb3()
      const tokenId = web3.utils.soliditySha3(this.subject, this.firstName, this.lastName, Date.parse(this.issueDate))
      this.$router.push({ name: 'certification', params: { id: tokenId } })
    }
  }
}
</script>
