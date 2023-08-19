import React, { useState } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
//import AssetSelector from '../../../../solidity/AssetSelector'; // Import the AssetSelector component

export default function Component() {
  const address = '0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8'; // Default address
  const [a1, setA1] = useState('');
  const [u1, setU1] = useState('1');
  const [o1, setO1] = useState('');
  const [p_id, setP_id] = useState('0');
  const [a3, setA3] = useState('');

  const handleOracleChange = (e) => {
    const selectedOracle = e.target.value;
    const oracleMapping = {
      Dummy: '0',
      Chainlink: '1',
      Pyth: '2',
      Custom: '3',
    };
    setO1(oracleMapping[selectedOracle]);

    const a1Mapping = {
      Chainlink: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
      Pyth: '0xff1a0f4744e8582DF1aE09D5611b887B6a12925C',
    };
    setA1(a1Mapping[selectedOracle]);
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Deploy Price Feed</h2>
      
      <br />
      <label>
        Select Oracle:
        <select value={o1} onChange={handleOracleChange} style={{ marginLeft: '8px', padding: '4px', width: '400px' }}>
          <option value="" disabled>Select an Oracle</option>
          <option value="Dummy">Dummy</option>
          <option value="Chainlink">Chainlink</option>
          <option value="Pyth">Pyth</option>
          <option value="Custom">Custom</option>
        </select>
      </label>
      <br />
      <Web3Button
        contractAddress="0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"
        action={(contract) => {
          contract.call('deployPriceFeed', [a1, u1, o1, p_id, a3]);
        }}
        style={{ marginTop: '16px' }}
      >
        deployPriceFeed
      </Web3Button>
    </div>
  );
}
