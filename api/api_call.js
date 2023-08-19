const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const apiURL = 'http://127.0.0.1:5000https://mdrv-6-backend-brillaugte.replit.app'; // Replace with your Flask app's URL
    const endpoint = '/open_trade'; // Replace with the desired endpoint

    const response = await axios.post(`${apiURL}${endpoint}`, {
      symbol: req.body.symbol,
      side: req.body.side,
      amount: req.body.amount,
      price: req.body.price,
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error calling Flask API:', error);
    res.status(500).send('Error calling Flask API');
  }
};
