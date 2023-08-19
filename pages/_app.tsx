import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Layout from './components/MDRV/layout';
import { Mumbai, Arbitrum } from "@thirdweb-dev/chains";
import { Web3Button } from '@thirdweb-dev/react';
import {useState} from 'react';
import DepositComponent from './components/MDRV/deposit';
import PythComponent from './components/MDRV/pyth';
import DeployPriceFeedComponent from './components/MDRV/deployPriceFeed';
import QuoteDisplayComponent from './components/display/quoteComponent';
import BalanceComponent from './components/display/balanceComponent';
import BinanceOpenTradeComponent from './components/binance/binanceOpenTradeComponent';
import AssetSelector from './components/MDRV/AssetSelector';


const Myaddress = "0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8";
const MDRV = "0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"; // MDRV contract
//const events = await contract.events.getEvents("Quote");

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedAssetAddress, setSelectedAssetAddress] = useState('');
  const [selectedAssetName, setSelectedAssetName] = useState('');

  const handleAssetSelection = (address : string, assetName : string) => {
    setSelectedAssetAddress(address);
    setSelectedAssetName(assetName);
  };

  return (
    <div>
    <ThirdwebProvider
      activeChain={Mumbai}
      
      clientId="3872f830028481ed73e2103b84ae94b7"
    >
      <Layout>
        <Component {...pageProps} />
        </Layout>
        <div>
        <DepositComponent />
        <AssetSelector
        initialA3={selectedAssetAddress}
        onAssetSelected={handleAssetSelection}
      />
        <PythComponent />
        <DeployPriceFeedComponent />
        <QuoteDisplayComponent />
        <BalanceComponent />
        <BinanceOpenTradeComponent />

        
    </div>
      
    </ThirdwebProvider>
    
    
  </div>

  );
}

export default MyApp;
