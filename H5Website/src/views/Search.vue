<template>
  <div class="search">
    <h3>认证查询</h3>
    <input type="text" class="search-input" placeholder="请输入身份证号：" v-model="searchInput">
    <button @click="clickHandler" class="search-btn">查询</button>
  </div>
</template>

<style scoped lang="stylus">
  .search
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
  name: 'search',
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
