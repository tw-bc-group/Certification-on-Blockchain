<template>
  <div></div>
</template>

<script>
import { retrieveContract, walletAddress, retrieveWeb3 } from '../web3Provider'

export default {
  name: 'home',
  async created () {
    const wallet = walletAddress()
    if (typeof wallet === 'undefined') {
      this.$router.push({ name: 'search' })
      return
    }

    const contract = retrieveContract()
    const count = await contract.methods.balanceOf(wallet).call()
    if (count === 0) {
      this.$router.push({ name: 'search' })
      return
    }

    const web3 = retrieveWeb3()
    const tokenId = await contract.methods.tokenOfOwnerByIndex(wallet, 0).call()
    this.$router.push({ name: 'certification', params: { id: web3.utils.numberToHex(tokenId) } })
  }
}
</script>
