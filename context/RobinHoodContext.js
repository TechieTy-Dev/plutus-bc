import { createContext, useEffect, useState} from 'react'
import { useMoralis } from 'react-moralis'
import { 
  btcAbi,
  bnbAbi,
  atomAbi,
  avaxAbi,
  dotAbi,
  fttAbi,
  linkAbi,
  maticAbi,
  solAbi,
  uniAbi,
  Btc,
  Bnb,
  Atom,
  Avax,
  Dot,
  Ftt,
  Link,
  Matic,
  Sol,
  Uni,
} from '../lib/constant'

export const RobinhoodContext = createContext()

export const RobinhoodProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formattedAccount, setFormattedAccount] = useState('')
  const [coinSelect, setCoinSelect] = useState('BTC')
  const [toCoin, setToCoin] = useState('')
  const [balance, setBalance] = useState('')

  const [amount, setAmount] = useState('')

  const { isAuthenticated, authenticate, user, logout, Moralis, enableWeb3 } =
    useMoralis()

  useEffect(async () => {
    if (isAuthenticated) {
      const account = user.get('ethAddress')
      let formatAccount = account.slice(0, 4) + '...' + account.slice(-4)
      setFormattedAccount(formatAccount)
      setCurrentAccount(account)
      const currentBalance = await Moralis.Web3API.account.getNativeBalance({
        chain: 'rinkeby',
        address: currentAccount,
      })
      const balanceToEth = Moralis.Units.FromWei(currentBalance.balance)
      const formattedBalance = parseFloat(balanceToEth).toFixed(3)
      setBalance(formattedBalance)
    }
  }, [isAuthenticated, enableWeb3])

  useEffect(() => {
    if (!currentAccount) return
    ;(async () => {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: currentAccount,
        }),
      })

      const data = await response.json()
    })()
  }, [currentAccount])

//GET Contract Address  
  const getContractAddress = () => {
    if(coinSelect === 'BTC') return Btc
    if(coinSelect === 'BNB') return Bnb
    if(coinSelect === 'ATOM') return Atom
    if(coinSelect === 'AVAX') return Avax
    if(coinSelect === 'DOT') return Dot
    if(coinSelect === 'FTT') return Ftt
    if(coinSelect === 'LINK') return Link
    if(coinSelect === 'MATIC') return Matic
    if(coinSelect === 'SOL') return Sol
    if(coinSelect === 'UNI') return Uni
  }
//TO Contract Address
  const getToAddress = () => {
    if(toCoin === 'BTC') return Btc
    if(toCoin === 'BNB') return Bnb
    if(toCoin === 'ATOM') return Atom
    if(toCoin === 'AVAX') return Avax
    if(toCoin === 'DOT') return Dot
    if(toCoin === 'FTT') return Ftt
    if(toCoin === 'LINK') return Link
    if(toCoin === 'MATIC') return Matic
    if(toCoin === 'SOL') return Sol
    if(toCoin === 'UNI') return Uni 
  }
// ABI of Coin
  const getToAbi = () => {
    if(toCoin === 'BTC') return btcAbi
    if(toCoin === 'BNB') return bnbAbi
    if(toCoin === 'ATOM') return atomAbi
    if(toCoin === 'AVAX') return avaxAbi
    if(toCoin === 'DOT') return dotAbi
    if(toCoin === 'FTT') return fttAbi
    if(toCoin === 'LINK') return linkAbi
    if(toCoin === 'MATIC') return maticAbi
    if(toCoin === 'SOL') return solAbi
    if(toCoin === ' UNI') return uniAbi
  }
 
  //MINT FUNCTION
  const mint = async () => {
    try {
      if (coinSelect === 'ETH') {
        if (!isAuthenticated) return
        await Moralis.enableWeb3()
        const contractAddress = getToAddress()
        const abi = getToAbi()

        let options = {
          contractAddress: contractAddress,
          functionName: 'mint',
          abi: abi,
          params: {
            to: currentAccount,
            amount: Moralis.Units.Token('50', '18'),
          },
        }
        sendEth()
        const transaction = await Moralis.executeFunction(options)
        const receipt = await transaction.wait(4)
        console.log(receipt)
        saveTransaction(receipt.transactionHash, amount, receipt.to)
      } else {
        swapTokens()
        saveTransaction(receipt.transactionHash, amount, receipt.to)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const swapTokens = async () => {
    try {
      if (!isAuthenticated) return
      await Moralis.enableWeb3()

      if (coinSelect === toCoin) return

      const fromOptions = {
        type: 'erc20',
        amount: Moralis.Units.Token(amount, '18'),
        receiver: getContractAddress(),
        contractAddress: getContractAddress(),
      }
      const toMintOptions = {
        contractAddress: getToAddress(),
        functionName: 'mint',
        abi: getToAbi(),
        params: {
          to: currentAccount,
          amount: Moralis.Units.Token(amount, '18'),
        },
      }
      let fromTransaction = await Moralis.transfer(fromOptions)
      let toMintTransaction = await Moralis.executeFunction(toMintOptions)
      let fromReceipt = await fromTransaction.wait()
      let toReceipt = await toMintTransaction.wait()
      console.log(fromReceipt)
      console.log(toReceipt)
    } catch (error) {
      console.error(error.message)
    }
  }

  //Send eth function
  const sendEth = async () => {
    if (!isAuthenticated) return
    const contractAddress = getToAddress()

    let options = {
      type: 'native',
      amount: Moralis.Units.ETH('0.01'),
      receiver: contractAddress,
    }
    const transaction = await Moralis.transfer(options)
    const receipt = await transaction.wait()
    console.log(receipt)
    saveTransaction(receipt.transactionHash, '0.01', receipt.to)
  }

  const saveTransaction = async (txHash, amount, toAddress) => {
    await fetch('/api/swapTokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        txHash: txHash,
        from: currentAccount,
        to: toAddress,
        amount: parseFloat(amount),
      }),
    })
  }

  const connectWallet = () => {
    authenticate()
  }

  const signOut = () => {
    console.log('Logged out')
    logout()
  }

  return (
    <RobinhoodContext.Provider
      value={{
        connectWallet,
        currentAccount,
        signOut,
        isAuthenticated,
        formattedAccount,
        setAmount,
        mint,
        setCoinSelect,
        coinSelect,
        balance,
        swapTokens,
        amount,
        toCoin,
        setToCoin,
      }}
    >
      {children}
    </RobinhoodContext.Provider>
  )
}