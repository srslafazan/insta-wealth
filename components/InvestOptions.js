import { useState } from 'react'
import { path, pathOr } from 'ramda'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import constructERC20Contract from '../constructors/constructERC20Contract'
import supportedTokens from '../constants/supportedTokens'
import {
  getContractAddressForAsset,
} from '../utils'
import { useMetaMaskValue } from '../context/MetaMask'


export default ({}) => {
  const [metaMaskContext, dispatch] = useMetaMaskValue()
  const { selectedAddress } = metaMaskContext
  const [selectedToken, setSelectedToken] = useState('')

  return (
    <Paper style={{ padding: '20px' }}>
      <h1>Invest</h1>
      <p>Invest directly into Compound interest-bearing DAI loan</p>

      {/*<FormControl variant="outlined">*/}
        <InputLabel htmlFor="token">Token</InputLabel>
        <Select
          style={{ width: '100px' }}
          value={selectedToken}
          onChange={(e) => {
            setSelectedToken(e.target.value)
          }}
          labelWidth={100}
          displayEmpty
          inputProps={{
            name: 'token',
            id: 'token',
          }}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          {supportedTokens.map((token, i) => {
            return (
              <MenuItem key={i} value={token}>{token}</MenuItem>
            )
          })}
          <MenuItem value={'ETH'}>{'ETH'}</MenuItem>
        </Select>
      {/*</FormControl>*/}
      <Button
        style={{ margin: '0 0 0 10px' }}
        variant="contained"
        color="primary"
        children={`Invest`}
        disabled={!selectedToken}
        onClick={() => {

          if (selectedToken === 'ETH') {
            console.log('ETH workflow')
          } else {
            {/*const contract = constructERC20Contract('0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')*/}
            {/*const contract = constructERC20Contract('0xc94a6e7776bade5da316cf6fd8c751fb0d5c3c5e')*/}
            {/*const contract = constructERC20Contract('0xF5DCe57282A584D2746FaF1593d3121Fcac444dC')*/}
            const contract = constructERC20Contract(getContractAddressForAsset(selectedToken))
            contract.balanceOf(selectedAddress, (e, r) => {
              if (e) return console.error(e)
              console.log(r.toString())
            })
          }
        }}
      />
    </Paper>
  )
}


  // <Button
  //       variant="contained"
  //       color="primary"
  //       children={`Invest`}
  //       disabled={}
  //       onClick={() => {
  //         {/*const contract = constructERC20Contract('0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')*/}
  //         const contract = constructERC20Contract('0xc94a6e7776bade5da316cf6fd8c751fb0d5c3c5e')
  //         {/*const contract = constructERC20Contract('0xF5DCe57282A584D2746FaF1593d3121Fcac444dC')*/}
  //         contract.balanceOf(selectedAddress, (e, r) => {
  //           console.log(r.toString())
  //         })
  //       }}
  //     />

  //     {supportedTokens.map((token, i) => {
  //       return (
  //         <div key={i}>
  //           <br />
  //           <br />
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             children={`Invest ${token}`}
  //             onClick={() => {
  //               {/*const contract = constructERC20Contract('0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')*/}
  //               const contract = constructERC20Contract('0xc94a6e7776bade5da316cf6fd8c751fb0d5c3c5e')
  //               {/*const contract = constructERC20Contract('0xF5DCe57282A584D2746FaF1593d3121Fcac444dC')*/}
  //               contract.balanceOf(selectedAddress, (e, r) => {
  //                 console.log(r.toString())
  //               })
  //             }}
  //           />
  //           <span style={{ margin: '0 0 0 10px'}}>{metaMaskContext[token]} {token} available</span>
  //         </div>
  //       )
  //     })}
  //     <div>
  //       <br />
  //       <br />
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         children={`Invest ETH`}
  //         onClick={() => {
  //           console.log('invest ETH')
  //         }}
  //       />
  //       <span style={{ margin: '0 0 0 10px'}}>{metaMaskContext.ETH} ETH available</span>
  //     </div>
