import React, { useState, useEffect } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import pairsData from './pythID.json'; // Import the JSON data

export default function Component() {
  const [a1, setA1] = useState(''); // a1 will be set based on the selected oracle
  const [u1, setU1] = useState('1'); // Set initial value of u1
  const [o1, setO1] = useState(''); // User chooses an oracle from the list
  const [p_id, setP_id] = useState('0'); // Set initial value of p_id
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

  const handleOracleChange = (e) => {
    const selectedOracle = e.target.value;
    // Map the oracle name to the corresponding number
    const oracleMapping = {
      Dummy: '0',
      Chainlink: '1',
      Pyth: '2',
      Custom: '3',
    };
    setO1(oracleMapping[selectedOracle]);

    // Set a1 based on the selected oracle
    const a1Mapping = {
      Chainlink: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
      Pyth: '0xff1a0f4744e8582DF1aE09D5611b887B6a12925C',
    };
    setA1(a1Mapping[selectedOracle]);
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
