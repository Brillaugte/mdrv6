import React, { useState, useEffect } from 'react';
import pairsData from './pythID.json'; // Import the JSON data

const AssetSelector = ({ initialA3, onAssetSelected }) => {
  const [a3, setA3] = useState(initialA3);
  const [pairs, setPairs] = useState({}); // Store cryptocurrency pairs and contract addresses
  const [search, setSearch] = useState(''); // Store the search input value

  useEffect(() => {
    setPairs(pairsData);
  }, []);

  const handlePairChange = (e) => {
    const selectedPair = e.target.value;
    const address = pairs[selectedPair]?.address;
    setA3(address);
    if (onAssetSelected) {
      onAssetSelected(address, selectedPair);
    }
  };

  const filteredPairs = Object.keys(pairs).filter((pair) => pair.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
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
    </div>
  );
};

export default AssetSelector;
