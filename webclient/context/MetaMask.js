import React, { createContext, useContext, useReducer, useEffect } from 'react'
import {
  getNetworkName,
  getContractAddressForAsset,
} from '../utils'
import constructERC20Contract from '../constructors/constructERC20Contract'
import supportedTokens from '../constants/supportedTokens'

export const MetaMaskContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateEthereumEnabled': return { ...state, ethereumEnabled: action.payload }
    case 'updateSelectedAddress': return { ...state, selectedAddress: action.payload }
    case 'updateBalance': return { ...state, [action.token]: action.balance }
    case 'updateNetworkName': return { ...state, networkName: action.payload }
    case 'updateNetworkId': return { ...state, networkId: action.payload }
    default:
      return state
  }
}

async function fetchAddressInfo(address, dispatch = () => {}) {
  /* Handle accounts changed */
  dispatch({ type: 'updateSelectedAddress', payload: address })
  /* Get Address enabled */
  const enabled = await ethereum.enable()
  dispatch({ type: 'updateEthereumEnabled', payload: Boolean(enabled) })
  if (!enabled) return
  /* Handle fetch ETH balance */
  web3.eth.getBalance(address, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    const balance = web3.fromWei(res.toString())
    return dispatch({ type: 'updateBalance', token: 'ETH', balance })
  })
  /* Handle fetch token balances */
  supportedTokens.forEach(token => {
    if (!address) {
      return dispatch({ type: 'updateBalance', token, balance: 0 })
    } else {
      const contract = constructERC20Contract(getContractAddressForAsset(token))
      contract.balanceOf(address, (err, res) => {
        if (err) {
          console.error(err)
          return
        }
        return dispatch({ type: 'updateBalance', token, balance: res.toString() })
      })
    }
  })
  /* Update network */
  dispatch({ type: 'updateNetworkId', payload: ethereum.networkVersion })
  dispatch({ type: 'updateNetworkName', payload: getNetworkName(ethereum.networkVersion) })
}


export const MetaMaskProvider = ({ initialState = { selectedAddress: null }, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (!accounts[0]) {
        dispatch({ type: 'updateSelectedAddress', payload: null })
      } else {
        fetchAddressInfo(accounts[0], dispatch) /* Async */
      }
    })
    if (ethereum.selectedAddress) {
      fetchAddressInfo(ethereum.selectedAddress, dispatch) /* Async */
    }
  }, [typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && ethereum.selectedAddress])

  return (
    <MetaMaskContext.Provider value={[state, dispatch]}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetaMaskValue = () => useContext(MetaMaskContext)
