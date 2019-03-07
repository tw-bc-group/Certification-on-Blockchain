import Web3 from 'web3'
import abi from './abi.json'
import { endpoint, contractAddress } from './constant'

export const retrieveWeb3 = () => {
  if (window.ethereum) {
    return new Web3(window.ethereum)
  } else {
    return new Web3(endpoint)
  }
}

export const retrieveContract = () => {
  const web3 = retrieveWeb3()
  return new web3.eth.Contract(abi, contractAddress)
}

export const walletAddress = () => {
  if (window.ethereum) {
    return window.ethereum.selectedAddress
  }
}
