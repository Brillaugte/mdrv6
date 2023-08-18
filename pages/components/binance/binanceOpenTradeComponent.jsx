import React, { useState } from 'react';
import axios from 'axios';

const binanceOpenTradeComponent = () => {
  const [symbol, setSymbol] = useState('');
  const [side, setSide] = useState('BUY');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/open_trade', {
        symbol,
        side,
        amount,
        price,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Symbol:
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      </label>
      <label>
        Side:
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
      </label>
      <label>
        Amount:
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button type="submit">Open Trade</button>
    </form>
  );
};

export default binanceOpenTradeComponent;
