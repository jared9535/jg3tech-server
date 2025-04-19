const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/fetch-amazon-orders', (req, res) => {
  const exampleOrders = [
    {
      name: "John Doe",
      address: "123 Example St, City, State",
      product: "24 Note Pedals",
      orderDate: "4/19/2025",
      shipByDate: "4/24/2025",
      source: "Amazon",
      completed: false,
      returned: false,
      invoice: "Paid",
      email: ""
    }
  ];
  
  res.json(exampleOrders);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
