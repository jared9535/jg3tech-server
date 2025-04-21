const express = require('express');
const cors = require('cors');
const { SellingPartnerApi } = require('@scaleleap/selling-partner-api-sdk');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// pull your SP API credentials in via Railway’s env‑vars
const sp = new SellingPartnerApi({
  region: 'na',                               // or eu / fe
  credentials: {
    clientId:            process.env.SPAPI_CLIENT_ID,
    clientSecret:        process.env.SPAPI_CLIENT_SECRET,
    refreshToken:        process.env.SPAPI_REFRESH_TOKEN,
    accessKeyId:         process.env.SPAPI_AWS_ACCESS_KEY_ID,
    secretAccessKey:     process.env.SPAPI_AWS_SECRET_ACCESS_KEY
  }
});

// Dummy health‑check
app.get('/', (req, res) => res.send('🟢 Server is up'));

// Real Amazon orders endpoint
app.get('/fetch-amazon-orders', async (req, res) => {
  try {
    // fetch all unshipped / partially‑shipped orders from the last 24h
    const out = await sp.callAPI({
      operation: 'getOrders',
      endpoint:  'orders',
      query: {
        MarketplaceIds: ['ATVPDKIKX0DER'],       // US marketplace
        CreatedAfter:   new Date(Date.now() - 86400000).toISOString(),
        OrderStatuses:  ['Unshipped', 'PartiallyShipped']
      }
    });

    // spit back just the list of orders
    res.json(out.Orders || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
