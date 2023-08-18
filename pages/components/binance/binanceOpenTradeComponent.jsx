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
            const exchange = new ccxt.binance({
                apiKey: "cd7c7de7b3068e692c46194d62f2b58031fa7961456edbd65f5e9bacb2eb7f33",
                secret: "85db7398d30172cad2d2cf0c44ee43e846e00747bb75eea2bf3c16ca4186b50c",
                enableRateLimit: true,
            });

            exchange.setSandboxMode (true)

            const order = await exchange.createOrder(symbol, 'limit', side, amount, price);

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
