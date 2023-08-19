import React, { useState } from 'react';


const BinanceOpenTradeComponent = () => {
  const [symbol, setSymbol] = useState('');
  const [side, setSide] = useState('BUY');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { symbol, side, amount, price };

    try {
      const response = await fetch('/api/open_trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error opening trade:', error);
    }
  };

  return (
    <div>
      <h2>Open Trade</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label>
        <br />
        <label>
          Side:
          <select value={side} onChange={(e) => setSide(e.target.value)}>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
        </label>
        <br />
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BinanceOpenTradeComponent;
