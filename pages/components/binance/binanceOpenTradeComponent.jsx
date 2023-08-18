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

            console.log('API Response:', response);

            if (response.status !== 200) {
                console.error('API Error:', response.status, response.statusText);
                return;
            }

            const responseText = await response.text();
            console.log('API Response Text:', responseText);

            try {
                const order = JSON.parse(responseText);
                setOrderResponse(order);
            } catch (error) {
                console.error('JSON Parsing Error:', error);
            }
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
