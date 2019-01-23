<template>
  <div class="home">
    <h3>ThoughtWorks认证</h3>
    <input type="number" class="search-input" placeholder="请输入手机号：" v-model="searchInput">
    <button @click="clickHandler" class="search-btn">查询</button>
  </div>
</template>s

<style scoped lang="stylus">
  .home
    margin 20px
    .search-input
      width 100%
      height 4em
      border-radius 0
      border-bottom 1px solid darkgrey
    .search-btn
      margin-top 20px
      color white
      width 100%
      height 2em
      font-size 16px
      border-radius 3em
      -webkit-box-sizing border-box
      box-sizing border-box
      background -webkit-gradient(linear, left top, right top, from(#F13235), to(#FA913D))
      background linear-gradient(to right, #F13235, #FA913D)
</style>

<script>
export default {
  name: 'home',
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
