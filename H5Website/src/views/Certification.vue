<template>
  <div>
    <div class="certification" :style="{backgroundImage: 'url('+ backgroundImage +')'}" v-if="!isLoading">
      <div class="logo-wrapper">
        <img v-for="logo in logos" :src="logo" class="logo" :key="logo"/>
      </div>
      <div class="display-wrapper">
        <div class="title-wrapper">
          <p>certification of</p>
          <p>completion</p>
        </div>
        <div class="winner-wrapper">
          <p>{{certification.firstName}}</p>
          <p>{{certification.lastName}}</p>
        </div>
        <div class="content-wrapper padding-wrapper">
          <p class="subject">{{certification.subject}}</p>
          <p class="hash-code">{{id | slice}}</p>
        </div>
        <div class="date-wrapper padding-wrapper">
          <p>{{certification.issueDate | date}}</p>
          <p v-if="certification.expireDate">Expired at: {{certification.expireDate | date}}</p>
        </div>
      </div>
    </div>
    <infinite-loading v-if="isLoading"></infinite-loading>
  </div>
</template>

<style scoped lang="stylus">
  .certification
    margin 10px
    font-weight 400
    height 500px
    background-size 100% 100%
    text-align left

  .logo
    padding 15px 10px 15px 5px
    width 65px
    height 80px
    display inline-block
    object-fit contain

  .display-wrapper
    padding 0 100px 0 50px

  .title-wrapper
    padding-top 76px
    font-size 10px
    font-weight 300
    color white
    line-height 1.25
    text-transform uppercase
    letter-spacing 0.2px

  .winner-wrapper
    padding-top 25px
    font-size 35px
    font-weight 900
    line-height 0.9
    text-transform uppercase
    color white

  .padding-wrapper
    padding 0 4px

  .subject
    padding-top 29px
    font-size 20px
    text-transform uppercase
    font-weight 900
    letter-spacing 0.1px

  .hash-code
    font-size 9px
    line-height 0.75

  .date-wrapper
    padding-top 25px
    font-size 10px
    line-height 1.5
    color white
</style>

<script>
import * as R from 'ramda'
import {
  bgImgTW,
  bgImgCorporate,
  bgImgCommunity,
  bgImgUniversity,
  logo,
  logoCorporate,
  logoCommunity,
  logoUniversity,
  huaweiLogo,
  communityLogo,
  universityLogo
} from '../constant'
import { web3, contract } from '../contract'

const bgGenerator = R.cond([
  [
    R.equals('Corporate'), R.always(bgImgCorporate)
  ],
  [
    R.equals('Community'), R.always(bgImgCommunity)
  ],
  [
    R.equals('University'), R.always(bgImgUniversity)
  ],
  [
    R.T, R.always(bgImgTW)
  ]
])

const partnerLogo = R.cond([
  [
    R.equals('Huawei'), R.always(huaweiLogo)
  ],
  [
    R.equals('Github'), R.always(communityLogo)
  ],
  [
    R.equals('BeiJingUniversity'), R.always(universityLogo)
  ],
  [
    R.T, R.always([])
  ]])

const logoGenerator = (type, partner) => {
  return R.cond([
    [
      R.equals('Corporate'), R.always([logoCorporate, partnerLogo(partner)])
    ],
    [
      R.equals('Community'), R.always([logoCommunity, partnerLogo(partner)])
    ],
    [
      R.equals('University'), R.always([logoUniversity, partnerLogo(partner)])
    ],
    [
      R.T, R.always([logo])
    ]
  ])(type)
}

export default {
  name: 'certification',
  components: {},
  data () {
    return {
      isLoading: true,
      id: this.$route.params.id,
      certification: {
        subject: '',
        firstName: '',
        lastName: '',
        issueDate: '',
        expireDate: ''
      },
      backgroundImage: bgGenerator(''),
      logos: logoGenerator()
    }
  },
  filters: {
    date: value => new Date(value).toLocaleDateString(),
    slice: value => value.slice(0, 20)
  },
  pures: {
    bgGenerator,
    logoGenerator
  },
  created () {
    const tokenId = web3.utils.hexToNumberString(this.$route.params.id)
    contract.methods.certifications(tokenId).call().then(certification => {
      this.certification.subject = certification.subject
      this.certification.firstName = certification.firstName
      this.certification.lastName = certification.lastName
      this.certification.issueDate = parseInt(certification.issueDate)
      this.certification.expireDate = parseInt(certification.expireDate)
      try {
        const addtionalData = JSON.parse(certification.addtionalData)
        if (typeof addtionalData.type === 'undefined') {
          return
        }
        this.backgroundImage = bgGenerator(addtionalData.type)
        if (typeof addtionalData.partner === 'undefined') {
          return
        }
        this.logos = logoGenerator(addtionalData.type, addtionalData.partner)
      } catch {
        this.backgroundImage = bgGenerator('')
        this.logos = logoGenerator()
      }
      this.isLoading = false
    })
  }
}
</script>
