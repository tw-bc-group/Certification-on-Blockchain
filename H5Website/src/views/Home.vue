<template>
  <div class="home">
    <h3>ThoughtWorks认证</h3>
    <router-link to="/search" tag="button" class="btn checker-btn">我是查询者</router-link>
    <router-link to="/issue" tag="button" class="btn issuer-btn">我是颁发者</router-link>
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
export default {
  name: 'home',
  components: {},
  data () {
    return {
      searchInput: null
    }
  },
  methods: {
  }
}
</script>
