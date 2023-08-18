import React, { useState } from 'react';
import ccxt from 'ccxt';

const BinanceOpenTradeComponent = () => {
    const [symbol, setSymbol] = useState('BTC/USDT');
    const [side, setSide] = useState('buy');
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(0);
    const [orderResponse, setOrderResponse] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/binance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    symbol: symbol,
                    side: side,
                    amount: amount,
                    price: price
                })
            });
    
            const order = await response.json();
            setOrderResponse(order);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Binance Future Testnet Trade</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Symbol:
                    <input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
                </label>
                <label>
                    Side:
                    <select value={side} onChange={(e) => setSide(e.target.value)}>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div>
                <h2>Order Response</h2>
                <pre>{JSON.stringify(orderResponse, null, 2)}</pre>
            </div>
        </div>
    );
};

export default BinanceOpenTradeComponent;
