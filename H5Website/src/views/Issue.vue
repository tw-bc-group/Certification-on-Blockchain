<template>
  <div class="issue">
    <h3>颁发证书</h3>
    <input type="text" class="text-input" placeholder="请输入身份证号：" v-model="searchInput">
    <button @click="clickHandler" class="confirm-btn">确认颁发</button>
  </div>
</template>

<style scoped lang="stylus">
  .issue
    margin 20px
    .text-input
      width 100%
      height 4em
      border-radius 0
      border-bottom 1px solid darkgrey
    .confirm-btn
      margin-top 20px
      color white
      width 100%
      height 2em
      font-size 16px
      border-radius 3em
      -webkit-box-sizing border-box
      box-sizing border-box
      background -webkit-gradient(linear, left top, right top, from(#056EC2), to(#0ECDCA))
      background linear-gradient(to right, #056EC2, #0ECDCA)
</style>

<script>
export default {
  name: 'issue',
  components: {},
  data () {
    return {
      searchInput: null
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
