import React, { useState, useEffect } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import pairsData from './updated_pairs_corrected.json'; // Import the JSON data

export default function Component() {
  const [a1, setA1] = useState('');
  const [u1, setU1] = useState('');
  const [o1, setO1] = useState('');
  const [p_id, setP_id] = useState('');
  const [a3, setA3] = useState('');
  const [pairs, setPairs] = useState({}); // Store cryptocurrency pairs and contract addresses
  const [search, setSearch] = useState(''); // Store the search input value

  // Load the JSON data extracted from the file into the component
  useEffect(() => {
    setPairs(pairsData);
  }, []);

  const handlePairChange = (e) => {
    const selectedPair = e.target.value;
    const address = pairs[selectedPair]?.address;
    setA3(address);
  };

  const filteredPairs = Object.keys(pairs).filter((pair) => pair.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Deploy Price Feed</h2>
      <label>
        Search pair:
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginLeft: '8px', padding: '4px', width: '400px' }} />
      </label>
      <br />
      <label>
        Select pair:
        <select value={a3} onChange={handlePairChange} style={{ marginLeft: '8px', padding: '4px', width: '400px' }}>
          <option value="" disabled>Select a pair</option>
          {filteredPairs.map((pair) => (
            <option key={pair} value={pair}>{pair}</option>
          ))}
        </select>
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
