import React, { useState, useEffect } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import pairsData from './pythID.json'; // Import the JSON data

export default function DeployPriceFeedComponent() {
  const [u1, setU1] = useState('');
  const [o1, setO1] = useState('');
  const [p_id, setP_id] = useState('');
  const [a3, setA3] = useState('');
  const [pairs, setPairs] = useState({}); // Store cryptocurrency pairs and contract addresses

  // Load the JSON data extracted from the file into the component
  useEffect(() => {
    setPairs(pairsData);
  }, []);

  const a1 = '0xff1a0f4744e8582DF1aE09D5611b887B6a12925C'; // Contract address

  const handlePairChange = (e) => {
    const selectedPair = e.target.value;
    const address = pairs[selectedPair];
    setA3(selectedPair + ' ' + address); // Concatenate the selected pair and address
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Deploy Price Feed</h2>
      <label>
        Select pair:
        <select value={a3.split(' ')[0]} onChange={handlePairChange} style={{ marginLeft: '8px', padding: '4px' }}>
          <option value="" disabled>Select a pair</option>
          {Object.keys(pairs).map((pair) => (
            <option key={pair} value={pair}>{pair}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Or manually enter pair and address: 
        <input type="text" value={a3} onChange={(e) => setA3(e.target.value)} style={{ marginLeft: '8px', padding: '4px', width: '400px' }} />
      </label>
      <br />
      <label>
        U1: <input type="text" value={u1} onChange={(e) => setU1(e.target.value)} style={{ marginLeft: '8px', padding: '4px' }} />
      </label>
      <br />
      <label>
        O1: <input type="text" value={o1} onChange={(e) => setO1(e.target.value)} style={{ marginLeft: '8px', padding: '4px' }} />
      </label>
      <br />
      <label>
        P_ID: <input type="text" value={p_id} onChange={(e) => setP_id(e.target.value)} style={{ marginLeft: '8px', padding: '4px' }} />
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
