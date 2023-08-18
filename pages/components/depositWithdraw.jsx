import { useState } from 'react';
import { Web3Button } from '@thirdweb-dev/react';

export default function DepositWithdrawComponent(spender) {
  // Create a state variable to store the desired amount
  const [amount, setAmount] = useState('');

  return (
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
        contractAddress="0x300f5ECE2c9D4265C9DA9021582ed1B71F403549"
        action={(contract) => {
          contract.call('approve', [spender, amount]);
        }}
      >
        approve
      </Web3Button>
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
  );
}
