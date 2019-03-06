<template>
  <div>
    <section class="search">
      <input type="text" class="search-input" placeholder="请输入证书编号：" v-model="id">
      <button @click="searchId" class="search-btn search-id">查询</button>
    </section>
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
      box-sizing border-box
      &.search-id
        background linear-gradient(to right, #F13235, #FA913D)
</style>

<script>
import {hash} from '../util'
export default {
  name: 'search',
  components: {},
  data () {
    return {
      id: null
    }
  },
  methods: {
    searchId () {
      if (this.id === null) return
      this.$router.push({ name: 'certification', params: { id: this.id } })
    }
  }
}
</script>
