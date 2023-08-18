import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Layout from './components/layout';
import { Mumbai, Arbitrum } from "@thirdweb-dev/chains";
import DepositWithdrawComponent from "./components/depositWithdraw";


const address = "0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={Mumbai}
      //signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()}
      clientId="3872f830028481ed73e2103b84ae94b7"
    >
      <Layout>
        <Component {...pageProps} />
        </Layout>
      {address && <DepositWithdrawComponent spender={address} />} 
      
    </ThirdwebProvider>

  );
}

export default MyApp;
