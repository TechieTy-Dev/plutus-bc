import '../styles/globals.css';
import { RobinhoodProvider } from '../context/RobinHoodContext';
import { MoralisProvider } from 'react-moralis';

function MyApp({ Component, pageProps }) {
  return (
  <MoralisProvider
    serverUrl='https://4pnxp9t5hybd.usemoralis.com:2053/server'
    appId='8QQPlA6nBmQekHwRhNgoNVac1cYNb0SwiMQ5GDY8'
  
  >
    <RobinhoodProvider>
     <Component {...pageProps} />
    </RobinhoodProvider>
  </MoralisProvider>
  )
}

export default MyApp
