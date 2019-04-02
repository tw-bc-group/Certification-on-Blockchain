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
          <div class="avatar-wrapper">
            <img class="avatar" :src="require('../assets/avatar.jpg')" :style="{border: '4px solid'+ color}" alt="avatar">
            <div class="square" :style="{background: color}"></div>
          </div>
          <div class="name-wrapper">
            <p>{{certification.firstName}}</p>
            <p>{{certification.lastName}}</p>
          </div>
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
    position relative

  .name-wrapper
    font-size 35px
    font-weight 900
    line-height 1
    text-transform uppercase
    color white

  .avatar-wrapper
    position absolute
    top -40px
    right 100px

  .avatar
    width 60px
    height 60px
    object-fit cover
    border-radius 50%
    position absolute
    z-index 10

  .square
    content ""
    display inline-block
    width 16px
    height 16px
    position absolute
    left 4px
    top 40px
    box-shadow 0 2px 10px #333333

  .padding-wrapper
    padding 0 4px

  .subject
    padding-top 25px
    font-size 20px
    text-transform uppercase
    font-weight 900
    letter-spacing 0.1px
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
    width 90%

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
import { retrieveContract, retrieveWeb3 } from '../web3Provider'

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

const colourGenerator = R.cond([
  [
    R.equals('Corporate'), R.always('#7ABC41')
  ],
  [
    R.equals('Community'), R.always('#F68346')
  ],
  [
    R.equals('University'), R.always('#985AC7')
  ],
  [
    R.T, R.always('#4EACEC')
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
      logos: logoGenerator(),
      color: colourGenerator()
    }
  },
  filters: {
    date: value => new Date(value).toLocaleDateString(),
    slice: value => value.slice(0, 20)
  },
  pures: {
    bgGenerator,
    logoGenerator,
    colourGenerator
  },
  created () {
    const contract = retrieveContract()
    const web3 = retrieveWeb3()

    const tokenId = web3.utils.hexToNumberString(this.$route.params.id)
    contract.methods.certifications(tokenId).call().then(certification => {
      this.certification.subject = certification.subject
      this.certification.firstName = certification.firstName
      this.certification.lastName = certification.lastName
      this.certification.issueDate = parseInt(certification.issueDate)
      this.certification.expireDate = parseInt(certification.expireDate)
      try {
        const additionalData = JSON.parse(certification.additionalData)
        if (typeof additionalData.type === 'undefined') {
          return
        }
        this.backgroundImage = bgGenerator(additionalData.type)
        if (typeof additionalData.partner === 'undefined') {
          return
        }
        console.log(additionalData.partner)
        this.logos = logoGenerator(additionalData.type, additionalData.partner)
        this.color = colourGenerator(additionalData.type)
      } catch {
        this.backgroundImage = bgGenerator('')
        this.logos = logoGenerator()
        this.color = colourGenerator('')
      }
      this.isLoading = false
    })
  }
}
</script>
