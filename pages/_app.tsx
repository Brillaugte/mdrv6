import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Layout from './components/layout';
import { Mumbai, Arbitrum } from "@thirdweb-dev/chains";
import { Web3Button } from '@thirdweb-dev/react';
import {useState} from 'react';




const address = "0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8";
const MDRV = "0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"; // MDRV contract
//const events = await contract.events.getEvents("Quote");

function MyApp({ Component, pageProps }: AppProps) {
  const [amount, setAmount] = useState('');


  return (
    <ThirdwebProvider
      activeChain={Mumbai}
      
      clientId="3872f830028481ed73e2103b84ae94b7"
    >
      <Layout>
        <Component {...pageProps} />
        </Layout>
        <div>
        <label>
        Enter the desired amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <Web3Button
        contractAddress="0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"
        action={(contract) => {
          contract.call('deposit', [amount]);
        }}
      >
        deposit
      </Web3Button>
      <Web3Button
        contractAddress="0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"
        action={(contract) => {
          contract.call('withdraw', [amount]);
        }}
      >
        withdraw
      </Web3Button>
    </div>
      
    </ThirdwebProvider>

  );
}

export default MyApp;