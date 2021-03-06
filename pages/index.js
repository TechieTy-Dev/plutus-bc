//Icons
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';

//Components
import BuyTokens from '../components/BuyTokens';
import Notice from '../components/Notice';
import Header from '../components/Header';
import PortfolioChart from '../components/PortfolioChart';
import Asset from '../components/Asset';

//Depenencies 
import axios from 'axios';
import { useState, useContext } from 'react';
import { RobinhoodContext } from '../context/RobinHoodContext'

const styles ={
  wrapper: 'w-screen h-screen flex flex-col bg-[#1E2123]',
  mainContainer:'w-2/3 h-full m-auto flex mt-16',
  leftMain:'flex flex-col w-3/4 h-full p-6 overflow-y-scroll',
  portfolioAmountContainer:'flex flex-col',
  portfolioAmount:'text-white text-4xl',
  portfolioPercent: 'text-white font-bold text-sm',
  pastHour: 'text-gray-400',
  chartContainer: ' text-5xl flex justify-center w-full h-1/3 text-white mt-11 mb-11',
  buyingPowerContainer: 'w-full border-t mb-24 border-b h-16 border-[#f5f5f5] flex justify-between items-center p-4',
  buyingPowerTitle: 'text-white font-bolder text-lg',
  buyingPowerAmount: ' text-white font-bolder text-xl',
  notice: 'flex border border-[#f5f5f5] mx-11 my-4 p-5 flex-col flex-1',
  noticeContainer: 'flex-1',
  noticeTitle: 'text-green-200',
  noticeMessage: 'text-white font-bold',
  noticeCTA:'font-bold text-green-500 cursor-pointer mt-5',
  rightMain: 'flex flex-col flex-1 h-4/5 bg-[#30363b] mt-6 rounded-lg overflow-y-scroll noScroll',
  rightMainItem: 'flex items-center text-white p-5 border-b border-[#f5f5f5]',
  ItemTitle: 'flex-1 font-bold',
  moreOptions: 'cursor-pointer text-xl',

}

export default function Home({ coins }) {
  const [myCoins] = useState([...coins.slice(0, 1)])
  const { balance, swapError } = useContext(RobinhoodContext)
  return (
    <div className={styles.wrapper}>
    <Header /> 
    <div className={styles.mainContainer}>
      <div className={styles.leftMain}>
          <div className={styles.portfolioAmountContainer}> 
            <div className={styles.portfolioAmount}>{balance} ETH
            </div>
            <div className={styles.portfolioPercent}>+.004(+3%)
              <span className={styles.pastHour}>Past Hour</span>
            </div>
          </div>
          <div>
            <div className={styles.chartContainer}>
              <PortfolioChart />
            </div>
          </div>
          <div className={styles.buyingPowerContainer}>
            <div className={styles.buyingPowerTitle}>Buying Power
            </div>
            <div className={styles.buyingPowerAmount}>{balance} ETH </div>
          </div>
          <div className={styles.notice}>
            <div className={styles.noticeContainer}>
              <div className={styles.noticeTitle}>Send Funds</div>
              <div className={styles.noticeMessage}>
              Transfer your funds here.
              </div>
              <BuyTokens /> 
            </div>
          </div>
          <Notice /> 
      </div>
       {/* Right Column with Crypto Assets and Graphs */}
      <div className={styles.rightMain}>
        <div className={styles.rightMainItem}>
          <div className={styles.ItemTitle}>
          Crypto Currencies 
          </div>
          <BiDotsHorizontalRounded className={styles.moreOptions} />
          </div>
          <Asset coin={"SOL"} price={15.23} />

      <div className={styles.rightMainItem}>
        <div className={styles.ItemTitle}> Lists </div>
        <AiOutlinePlus className={styles.moreOptions} />
        </div>
      </div>
    </div>
  </div>
  )
}

export const getStaticProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrentUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      tiers: '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '50',
      offset: '0',
    },
    headers: {
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      'X-RapidAPI-Key': '207995447cmshf6d7976868c5e76p171c25jsn9cdf1bcba323',
    },
  }

  const res = await axios.request(options)
  const coins = res.data.data.coins

  return {
    props: { coins },
  }
}