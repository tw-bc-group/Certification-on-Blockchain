import Web3 from 'web3'
import abi from './abi1.json'
import { endpoint, contractAddress } from './constant'

export const web3 = new Web3(endpoint)
export const contract = new web3.eth.Contract(abi, contractAddress)
export const walletAddress = () => {
  if (typeof ethereum !== 'undefined') {
    return ethereum.selectedAddress
  }
}
