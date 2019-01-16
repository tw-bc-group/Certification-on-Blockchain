<template>
  <div class="certification" :style="{backgroundImage: 'url('+ backgroundImage +')'}">
    <div class="logo-wrapper">
      <img v-for="logo in logos" :src="logo" class="logo" :key="logo"/>
    </div>
    <div class="display-wrapper">
      <div class="title-wrapper">
        <p>certification of</p>
        <p>completion</p>
      </div>
      <div class="winner-wrapper">
        <p>{{certification.winner.firstName}}</p>
        <p>{{certification.winner.lastName}}</p>
      </div>
      <div class="content-wrapper padding-wrapper">
        <p class="subject">{{certification.subject}}</p>
        <p class="hash-code">{{hashCode}}</p>
      </div>
      <div class="date-wrapper padding-wrapper">
        <p>{{certification.awardDate}}</p>
        <p v-if="certification.expiredDate">Expired at: {{certification.expiredDate}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
  .certification
    margin 10px
    font-weight 400
    height 500px
    background-size 100% 100%
    text-align left

  .logo-wrapper
    padding 15px 20px

  .logo
    width 50px
    height 50px
    display inline-block

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
import httpDriver from '../driver/http'
import * as R from 'ramda'
import logo from '../assets/logo.jpeg'
import logoCorporate from '../assets/logoCorporate.png'
import huaweiLogo from '../assets/huaweiLogo.png'
import bgImgTW from '../assets/bgImgTW.png'
import bgImgCorporate from '../assets/bgImgCorporate.png'

const hashCodeGenerator = (str) => str.substring(0, 19)

const bgGenerator = R.cond([
  [
    R.equals('Corporate'), R.always(bgImgCorporate)
  ],
  [
    R.equals('Community'), R.always(bgImgCorporate)
  ],
  [
    R.equals('University'), R.always(bgImgCorporate)
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
    R.equals('Github'), R.always(huaweiLogo)
  ],
  [
    R.equals('BeiJingUniversity'), R.always(huaweiLogo)
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
      R.equals('Community'), R.always([logoCorporate, partnerLogo(partner)])
    ],
    [
      R.equals('University'), R.always([logoCorporate, partnerLogo(partner)])
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
      certification: {
        certificationType: '',
        winner: {
          firstName: '',
          lastName: '',
          mobileNumber: ''
        },
        subject: '',
        awardDate: '',
        expiredDate: '',
        partner: ''
      },
      hashCode: null,
      backgroundImage: null,
      logos: null
    }
  },
  methods: {
    dataProvider ({ getCertification, getWinner }) {
      const { query } = this.$route.query
      const certification = getCertification(query)
      const winner = getWinner(query)

      Promise.all([certification, winner]).then(res => {
        const cr = res[0].data
        const wr = res[1].data
        this.certification = cr
        this.certification.winner = wr
        this.hashCode = hashCodeGenerator(wr.mobileNumber)
        this.backgroundImage = bgGenerator(cr.certificationType)
        this.logos = logoGenerator(cr.certificationType, cr.partner)
      })
    }
  },
  pures: {
    hashCodeGenerator,
    bgGenerator,
    logoGenerator
  },
  created () {
    this.dataProvider(httpDriver)
  }
}
</script>
