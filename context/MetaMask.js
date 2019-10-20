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
    case 'updateSelectedAddress': return { ...state, selectedAddress: action.payload }
    case 'updateBalance': return { ...state, [action.token]: action.balance }
    case 'updateNetworkName': return { ...state, networkName: action.payload }
    case 'updateNetworkId': return { ...state, networkId: action.payload }
    default:
      return state
  }
}

function fetchAddressInfo(address, dispatch = () => {}) {
  /* Handle accounts changed */
  dispatch({ type: 'updateSelectedAddress', payload: address })
  /* Handle fetch ETH balance */
  web3.eth.getBalance(ethereum.selectedAddress, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    const balance = web3.fromWei(res.toString())
    dispatch({ type: 'updateBalance', token: 'ETH', balance })
  })
  /* Handle fetch token balances */
  supportedTokens.forEach(token => {
    const contract = constructERC20Contract(getContractAddressForAsset(token))
    contract.balanceOf(ethereum.selectedAddress, (err, res) => {
      if (err) return
      dispatch({ type: 'updateBalance', token, balance: res.toString() })
    })
  })

  dispatch({ type: 'updateNetworkId', payload: ethereum.networkVersion })
  dispatch({ type: 'updateNetworkName', payload: getNetworkName(ethereum.networkVersion) })
}


export const MetaMaskProvider = ({ initialState = { selectedAddress: null }, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchAddressInfo(ethereum.selectedAddress, dispatch)
    window.ethereum.on('accountsChanged', (accounts) => {
      fetchAddressInfo(accounts[0], dispatch)
    })
  }, [typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && ethereum.selectedAddress])

  return (
    <MetaMaskContext.Provider value={[state, dispatch]}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetaMaskValue = () => useContext(MetaMaskContext)
