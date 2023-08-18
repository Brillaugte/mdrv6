import { useEffect, useState } from 'react';
import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";

const INF_APPROVE_AMOUNT = '100000000000000000000000000';

export default function WalletComponent({account, spender}: {account: string, spender: string}) {

  const [amount, setAmount] = useState(0);

  console.log('Initial amount:', amount);
  console.log('Provided account:', account);
  console.log('Provided spender:', spender);

  // Define the contracts
  const { contract: contractForApprove } = useContract("0x300f5ECE2c9D4265C9DA9021582ed1B71F403549");
  const { contract: contractForDeposit } = useContract("0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2");

  console.log('Contracts:', { contractForApprove, contractForDeposit });

  // Read the balances
  const { data: walletBalance, isLoading: walletBalanceLoading, refetch: refetchWalletBalance } = useContractRead(contractForApprove, "balanceOf", [account]);
  const { data: depositBalance, isLoading: depositBalanceLoading, refetch: refetchDepositBalance } = useContractRead(contractForDeposit, "balanceOf", [account]);

  console.log('Initial balances:', { walletBalance, depositBalance });

  // Refresh the balances every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        console.log('Fetching balances...');
        refetchWalletBalance();
        refetchDepositBalance();
        console.log('Balances fetched:', { walletBalance, depositBalance });
      } catch(error) {
        console.error('Error while fetching balances:', error);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [walletBalance, depositBalance]);

  return (
    <div>
      <input 
        type='number' 
        value={amount} 
        onChange={(e) => {
          const newValue = Number(e.target.value);
          console.log('New amount:', newValue);
          setAmount(newValue);
        }} 
      />

      <Web3Button
        contractAddress="0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"
        action={(contract) => {
          try {
            console.log('Depositing...');
            contract.call("deposit", [amount]);
            console.log('Deposit complete.');
          } catch(error) {
            console.error('Error while depositing:', error);
          }
        }}
      >
        Deposit
      </Web3Button>

      <Web3Button
        contractAddress="0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"
        action={(contract) => {
          try {
            console.log('Withdrawing...');
            contract.call("withdraw", [amount]);
            console.log('Withdraw complete.');
          } catch(error) {
            console.error('Error while withdrawing:', error);
          }
        }}
      >
        Withdraw
      </Web3Button>

      <Web3Button
        contractAddress="0x300f5ECE2c9D4265C9DA9021582ed1B71F403549"
        action={(contract) => {
          try {
            console.log('Approving...');
            contract.call("approve", [spender, INF_APPROVE_AMOUNT]);
            console.log('Approve complete.');
          } catch(error) {
            console.error('Error while approving:', error);
          }
        }}
      >
        Infinite Approve
      </Web3Button>

      <div>
        Wallet Balance: {walletBalanceLoading ? 'Loading...' : walletBalance ? walletBalance.toString() : 'N/A'}
      </div>
      <div>
        Deposited Balance: {depositBalanceLoading ? 'Loading...' : depositBalance ? depositBalance.toString() : 'N/A'}
      </div>

    </div>
  );
}
