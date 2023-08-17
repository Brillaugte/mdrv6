import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Layout from './components/layout';
import { Mumbai, Arbitrum } from "@thirdweb-dev/chains";
import WalletComponent from "./components/depositWithdraw";


const activeChain = "Mumbai";
const address = "0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <Component {...pageProps} />
      {address && <WalletComponent account={address} spender={address} />} 
    </ThirdwebProvider>
  );
}

export default MyApp;
