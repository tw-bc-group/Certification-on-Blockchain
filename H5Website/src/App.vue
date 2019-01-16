<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  max-width 400px;

*
  margin 0
  padding 0
  border 0
  box-sizing border-box

input
  border-radius 0
  border none
  background-image none
  background-color transparent
  -webkit-box-shadow none
  -moz-box-shadow none
  box-shadow none
  &::placeholder
    color darkgrey
</style>
