const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Dummy Amazon Orders Endpoint
app.get('/fetch-amazon-orders', (req, res) => {
  const exampleOrders = [
    {
      name: "John Doe",
      address: "123 Example St, City, ST 12345",
      product: "24 Note Pedals",
      orderDate: "04/19/2025",
      shipByDate: "04/24/2025",
      source: "Amazon",
      completed: false,
      returned: false,
      invoice: "Paid",
      email: "john@example.com"
    }
  ];
  res.json(exampleOrders);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
