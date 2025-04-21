require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SellingPartnerApi = require('amazon-sp-api');

const app = express();
app.use(cors());

// make sure these four env vars are set in Railway:
// SP_APP_CLIENT_ID, SP_APP_CLIENT_SECRET, SP_REFRESH_TOKEN, AWS_SELLING_PARTNER_ROLE
const sp = new SellingPartnerApi({
  region: 'na',                           // or 'eu' / 'fe'
  refresh_token: process.env.SP_REFRESH_TOKEN,
  credentials: {
    SELLING_PARTNER_APP_CLIENT_ID:     process.env.SP_APP_CLIENT_ID,
    SELLING_PARTNER_APP_CLIENT_SECRET: process.env.SP_APP_CLIENT_SECRET,
    AWS_SELLING_PARTNER_ROLE:          process.env.AWS_SELLING_PARTNER_ROLE
  }
});

app.get('/fetch-amazon-orders', async (req, res) => {
  try {
    // fetch most recent orders (Last 24 hours as example)
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24*3600*1000).toISOString();
    const data = await sp.callAPI({
      operation: 'getOrders',
      endpoint: 'orders',
      query: {
        MarketplaceIds: ['ATVPDKIKX0DER'], // US marketplace
        CreatedAfter: yesterday
      }
    });
    res.json(data.Orders || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
