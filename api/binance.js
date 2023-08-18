const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const url = 'https://testnet.binance.vision/api/v3/order';
    const options = {
        method: 'POST',
        headers: {
            'X-MBX-APIKEY': 'your_api_key_here'
        },
        body: JSON.stringify(req.body)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
